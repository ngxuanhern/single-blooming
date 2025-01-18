package com.app.demo1;

public class Cart {
    private OneFlower flower;
    private int quantity;

    public Cart(OneFlower flower, int quantity) {
        this.flower = flower;
        this.quantity = quantity;
    }

    public OneFlower getFlower() {
        return flower;
    }

    public void setFlower(OneFlower flower) {
        this.flower = flower;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    @Override
    public String toString() {
        return "{\"name\": \"" + flower.getName() + "\", \"price\": " + flower.getPrice() + ", \"quantity\": " + quantity + "}";
    }
}

