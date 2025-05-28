package org.example;

public class Coffee {
    public String name;
    int stock;
    public int price;

    public Coffee(String name, int stock , int price) {
        this.name = name;
        this.stock = stock;
        this.price = price;
    }

    public boolean isAvailable() {
        return stock > 0;
    }

    public void dispense() {
        if (stock > 0) {
            stock--;
        }
    }
}

