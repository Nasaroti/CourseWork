package controllers;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import server.Main;

import javax.ws.rs.CookieParam;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.core.Cookie;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

@Path("Inventory/")
public class Inventory {
    @GET
    @Path("get")
    public String Inventoryget(@CookieParam("token") Cookie tokencookie) throws SQLException {
        String cookie = tokencookie.getValue(); //Gets value out of the cookie
        if (User.tokenvalidate(cookie))   //Calls the validate token from User.java
        {
            PreparedStatement ps = Main.db.prepareStatement("SELECT PlayerID FROM Player WHERE Cookie = ?");
            ps.setString(1, cookie);
            ResultSet results = ps.executeQuery();
            int PlayerID = results.getInt(1);

            System.out.println(PlayerID);

            PreparedStatement ps2 = Main.db.prepareStatement("Select ItemID FROM Inventory WHERE PlayerID = ?");
            ps2.setInt(1, PlayerID);
            ResultSet results2 = ps2.executeQuery();

            int ItemID;
            JSONArray response = new JSONArray();

            while (results2.next()) {
                ItemID = results2.getInt(1);

                PreparedStatement ps3 = Main.db.prepareStatement("Select Itemname FROM Item WHERE ItemID = ?");
                ps3.setInt(1, ItemID);
                ResultSet results3 = ps3.executeQuery();
                if (results3.next() == true) {
                    JSONObject row = new JSONObject();
                    row.put("Item", results3.getString(1));
                    response.add(row);
                }
            }
            return response.toString();

        }
        return "Error";
    }
}
