package com.app.demo1;

public class OneFlower {
    private String name;
    private double price;

    // Constructor
    public OneFlower( String name, double price) {
        this.name = name;
        this.price = price;
    }

    // Getters and Setters
        public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }
    @Override
    public String toString() {
        return "{\"name\": \"" + name + "\", \"price\": " + price + "}";
    }

}
