package controllers;

import org.json.simple.JSONObject;
import server.Main;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

@Path("Map/")
@Consumes(MediaType.MULTIPART_FORM_DATA)
@Produces(MediaType.APPLICATION_JSON)

public class Map {
    @GET
    @Path("get/{MapID}")
    public String Mapget (@PathParam("MapID") Integer MapID){

        System.out.println("Invoked  Map.Mapget for " + MapID);
        try{
            PreparedStatement ps = Main.db.prepareStatement("SELECT Map FROM Map WHERE MapID = ?");
            ps.setInt(1, MapID);
            ResultSet results = ps.executeQuery();
            JSONObject response = new JSONObject();
            if(results.next() == true){
                response.put("Map", results.getString(1));
            }
            return response.toString();
        } catch (SQLException e) {
            System.out.println("Database Error: " + e.getMessage());
            return "Error";
        }

    }
}
