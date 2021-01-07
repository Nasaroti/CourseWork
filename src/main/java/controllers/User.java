package controllers;
import org.glassfish.jersey.media.multipart.FormDataParam;
import org.json.simple.JSONObject;
import server.Main;

import javax.ws.rs.CookieParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Cookie;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.UUID;

@Path("User/")
public class User {

    @POST
    @Path("login")
    public String loginUser(@FormDataParam("Username") String Username, @FormDataParam("Password") String Password) {
        String correctPassword = passget(Username);
        System.out.println(correctPassword);
        try {
            if (Password.equals(correctPassword)) { //Compares the passwords and if the same will update the player table with the cookie
                String token = UUID.randomUUID().toString();
                PreparedStatement ps2 = Main.db.prepareStatement("UPDATE Player SET Cookie = ? WHERE Username = ?");
                ps2.setString(1, token);
                ps2.setString(2, Username);
                ps2.executeUpdate();
                JSONObject userDetails = new JSONObject();
                userDetails.put("username", Username);
                userDetails.put("token", token);
                System.out.println("Returning data");
                System.out.println(userDetails.toString());
                String toreturn = userDetails.toString();
                System.out.println(toreturn);
                return (toreturn); //Returns the cookie
            } else {
                return "{\"Error\": \"Something has gone wrong.   \"}";
            }
        } catch (SQLException e) {
            System.out.print("Database error during login: " + e.getMessage());
            return "{\"Error\": \"Something has gone wrong.   \"}";

        }
    }

    private String passget(String username) {
        try {
            PreparedStatement ps = Main.db.prepareStatement("SELECT Password FROM Player WHERE Username = ?");
            ps.setString(1, username);
            ResultSet results = ps.executeQuery();
            JSONObject response = new JSONObject();
            if (results.next() == true) {
                response.put("Password", results.getString(1));
            }
            return results.getString(1);
        } catch (SQLException e) {
            System.out.println("Database Error: " + e.getMessage());
            return "Incorrect Username or Password";
        }

    }


    public static boolean tokenvalidate(String token) {
        try {
            PreparedStatement ps = Main.db.prepareStatement("SELECT PlayerID FROM Player WHERE Cookie = ?");

            System.out.println("token is " + token);

            ps.setString(1, token);
            ResultSet logoutResults = ps.executeQuery();
            return logoutResults.next();   //logoutResults.next() will be true if there is a record in the ResultSet
        } catch (Exception exception) {
            System.out.println("Database error" + exception.getMessage());
            return false;
        }

    }

    @POST
    @Path("new")
    public String newUser(@FormDataParam("Username") String Username, @FormDataParam("Password") String Password) {
        try {
            PreparedStatement ps = Main.db.prepareStatement("SELECT Username FROM Player WHERE Username = ?"); //Checks for the username
            ps.setString(1, Username);
            ResultSet results = ps.executeQuery();
            System.out.println(results.getString(1));
            return "{\"Error\": \"Account already exists.\"}"; //If it exists return an error
        } catch (SQLException e) {
            try {
                //Create the account
                PreparedStatement ps2 = Main.db.prepareStatement("INSERT INTO Player (Username, Password, Timeswon, Fastest, Killnum) VALUES (?, ?, ?, ?, ?)"); //adds the new account
                System.out.println(Username + " : " + Password);
                ps2.setString(1, Username);
                ps2.setString(2, Password);
                ps2.setInt(3, 0);
                ps2.setString(4, "99:99:99");
                ps2.setInt(5, 0);
                ps2.execute();
                System.out.println(1);
                //Get the new account ID

                int playerID = getaccID(Username);
                if (playerID == 0) {return "{\"Error\": \"Something went wrong with account creation. New acc not found\"}";}

                //Use the player ID to set initial position
                PreparedStatement ps4 = Main.db.prepareStatement("INSERT INTO Position VALUES (?, ?, ?, ?, ?)"); //adds the new account
                ps4.setInt(1, playerID);
                ps4.setInt(2, 8);
                ps4.setInt(3, 4);
                ps4.setInt(4, 0);
                ps4.setInt(5, 5);
                ps4.execute();
                System.out.println(3);
            } catch (SQLException f) {
                return "{\"Error\": \"Something went wrong with account creation.\"}"; //Error
            }
        }
        return "{\"Success\": \"Account created\"}";
    }

    public static int getaccID(String Username) {
        try
        {
            System.out.println(2);
            PreparedStatement ps3 = Main.db.prepareStatement("SELECT PlayerID FROM Player WHERE Username = ?"); //Checks for the username
            System.out.println(ps3);
            ps3.setString(1, Username);
            System.out.println(4);
            ResultSet results2 = ps3.executeQuery();
            System.out.println(results2);
            System.out.println("Here :" + results2.getInt("PlayerID"));
            return(results2.getInt("PlayerID"));
        } catch (SQLException e)
        {
            return 0;
        }

    }
}

