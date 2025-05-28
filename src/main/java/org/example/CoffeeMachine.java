package org.example;

import java.util.Scanner;

public class CoffeeMachine {
    private final Inventory inventaire;
    private final Scanner scanner = new Scanner(System.in);

    public CoffeeMachine() {
        inventaire = new Inventory();
    }

    public void showMenu() {
        System.out.println("\n=== Menu Café ===");
        for (int i = 0; i < inventaire.getSize(); i++) {
            Coffee c = inventaire.getCoffee(i);
            System.out.println((i + 1) + ". " + c.name + " - " + c.price + " Ar (Stock: " + c.stock + ")");
        }
        System.out.println("0. Quitter");
    }

    public void start() {
        while (true) {
            showMenu();
            System.out.print("Choisissez un numéro de parfum (ou 0 pour quitter) : ");
            int choice;

            try {
                choice = Integer.parseInt(scanner.nextLine());
            } catch (NumberFormatException e) {
                System.out.println("Entrée invalide. Réessayez.");
                continue;
            }

            if (choice == 0) {
                System.out.println("Merci d'avoir utilisé la machine à café !");
                break;
            }

            Coffee selected = inventaire.getCoffee(choice - 1);
            if (selected == null) {
                System.out.println("Choix invalide.");
                continue;
            }

            if (!selected.isAvailable()) {
                System.out.println("Ce parfum est en rupture de stock.");
                continue;
            }

            System.out.print("Insérez au moins " + selected.price + " Ar : ");
            int amount;

            try {
                amount = Integer.parseInt(scanner.nextLine());
            } catch (NumberFormatException e) {
                System.out.println("Paiement invalide.");
                continue;
            }

            if (amount < selected.price) {
                System.out.println("Paiement insuffisant.");
                continue;
            }

            System.out.println("... en préparation ...");
            try {
                Thread.sleep(2000);
            } catch (InterruptedException e) {
                System.out.println("Une erreur est survenue pendant la préparation.");
                continue;
            }

            selected.dispense();
            System.out.println("Voilà votre café " + selected.name + " ☕. Merci !");
            if (amount > selected.price) {
                System.out.println("Monnaie rendue : " + (amount - selected.price) + " Ar");
            }
        }
    }
}
