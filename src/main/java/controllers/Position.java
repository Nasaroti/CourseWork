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

@Path("Position/")
public class Position {
    @GET
    @Path("get")
    public String Positionget(@CookieParam("token") Cookie tokencookie) throws SQLException {
        String cookie;
        if(tokencookie == null) {
            return "{\"Error\": \"Please sign in.\"}";
        } else {
            cookie = tokencookie.getValue();
        }

        if (User.tokenvalidate(cookie))   //Calls the validate token from User.java
        {
            PreparedStatement ps = Main.db.prepareStatement("SELECT PlayerID FROM Player WHERE Cookie = ?");
            ps.setString(1, cookie);
            ResultSet results = ps.executeQuery();
            int PlayerID = results.getInt(1);

            System.out.println(PlayerID);

            PreparedStatement ps2 = Main.db.prepareStatement("SELECT Xco, Yco, MapXco, MapYco FROM Position WHERE PlayerID = ?");
            ps2.setInt(1, PlayerID);


            ResultSet results2 = ps2.executeQuery();
            JSONObject response = new JSONObject();
            if (results2.next()) {
                response.put("Xco", results2.getInt(1));
                response.put("Yco", results2.getInt(2));
                response.put("MapXco", results2.getInt(3));
                response.put("MapYco", results2.getInt(4));
            }
            return response.toString();
        }
        return "Error";
    }
    @POST
    @Path("update")
    public void Positionupdate(@CookieParam("token") Cookie tokencookie, @FormDataParam("xco") Integer xco, @FormDataParam("yco") Integer yco, @FormDataParam("mapxco") Integer mapxco, @FormDataParam("mapyco") Integer mapyco) throws SQLException {
        String cookie = tokencookie.getValue(); //Gets value out of the cookie
        System.out.println("Calling Position/update");
        if (User.tokenvalidate(cookie))   //Calls the validate token from User.java
        {
            PreparedStatement ps = Main.db.prepareStatement("SELECT PlayerID FROM Player WHERE Cookie = ?");
            ps.setString(1, cookie);
            ResultSet results = ps.executeQuery();
            int PlayerID = results.getInt(1);

            System.out.println(PlayerID);

            PreparedStatement ps2 = Main.db.prepareStatement("UPDATE Position SET Xco = ?, Yco = ?, MapXco = ?, MapYco = ? WHERE PlayerID = ?");
            System.out.println(xco + " " + yco + " " + mapxco + " " + mapyco);
            ps2.setInt(1, xco);
            ps2.setInt(2, yco);
            ps2.setInt(3, mapxco);
            ps2.setInt(4, mapyco);
            ps2.setInt(5, PlayerID);

            ps2.executeUpdate();

            System.out.println("Position Updated");

        }
    }
}
