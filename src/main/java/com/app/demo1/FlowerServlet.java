package com.app.demo1;

import com.google.gson.Gson;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;


@WebServlet("/flowers")
public class FlowerServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    // Store flower data here
    private static List<OneFlower> flowerList = new ArrayList<>();

    @Override
    public void init() throws ServletException {
        // Hardcode some flowers into the list
        flowerList.add(new OneFlower("Rose", 10.00));
        flowerList.add(new OneFlower("Tulip", 12.00));
        flowerList.add(new OneFlower("Lily", 15.00));
    }

    // This method will handle GET requests and return the list of flowers as JSON
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        // Convert flower list to JSON
        Gson gson = new Gson();
        String json = gson.toJson(flowerList);

        // Send the JSON response to the frontend
        response.getWriter().write(json);
    }
}

