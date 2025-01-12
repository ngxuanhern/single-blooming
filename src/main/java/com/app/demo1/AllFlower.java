package com.app.demo1;

import java.util.ArrayList;
import java.util.List;

public class AllFlower {
    private List<OneFlower> flowerList;

    // Constructor
    public AllFlower() {
        flowerList = new ArrayList<>();
    }

    // Add flower to the list
    public void addFlower(OneFlower flower) {
        flowerList.add(flower);
    }

    // Get all flowers
    public List<OneFlower> getFlowerList() {
        return flowerList;
    }
    // Get a flower by its name
    public OneFlower getFlowerByName(String name) {
        for (OneFlower flower : flowerList) {
            if (flower.getName().equals(name)) { // Use equals() for string comparison
                return flower;
            }
        }
        return null; // Return null if not found
    }

}
