package controllers;
import org.glassfish.jersey.media.multipart.FormDataParam;
import org.json.simple.JSONObject;
import server.Main;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.UUID;

@Path("User/")
public class User {

    @POST
    @Path("login")
    public String loginUser(@FormDataParam("Username") String Username, @FormDataParam("Password") String Password) {
        String correctPassword = Passget(Username);
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
                return ( toreturn ); //Returns the cookie
            } else {
            return "{\"Error\": \"Something as gone wrong.   \"}";            }
    } catch (SQLException e) {
        System.out.print("Database error during login: " + e.getMessage());
        return  "{\"Error\": \"Something as gone wrong.   \"}";

    }
}

    public String Passget(String username) {
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
}