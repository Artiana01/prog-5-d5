package org.example;

import java.util.ArrayList;
import java.util.List;

public class Inventory {
    private final List<Coffee> coffees;

    public Inventory() {
        coffees = new ArrayList<>();
        coffees.add(new Coffee("Espresso", 5, 1000));
        coffees.add(new Coffee("Cappuccino", 5, 1200));
        coffees.add(new Coffee("Latte", 5, 1300));
        coffees.add(new Coffee("Mocha", 5, 1500));
    }

    public Coffee getCoffee(int index) {
        if (index < 0 || index >= coffees.size()) return null;
        return coffees.get(index);
    }

    public int getSize() {
        return coffees.size();
    }

    public List<Coffee> getCoffees() {
        return coffees;
    }
}
