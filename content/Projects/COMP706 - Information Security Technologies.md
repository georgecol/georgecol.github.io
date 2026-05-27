---
topic:
date: 2026-04-15
course:
tags:
  - projects/university
  - Year2
aliases:
  - crypto alg
  - comp607
  - Cryptography algorithm
draft: false
---
## About the paper

The curriculum of this paper covered almost all aspects of CompTIA Security +, the course book was Mark Campias CompTIA Security+ Guide to Network Security Fundamentals. With 2 practical assignments, the second being a vulnerability assessment of Windows Server and a Metasploitable instance through Kali Linux.

## About  Assignment 1
Although creation of proprietary cryptography algorithms is in no way best practice or advised.
In my Information Security Technologies paper, we were tasked with building a cipher to showcase our knowledge in cryptography. 

Coming into this assignment, I knew next to nothing about cryptography. This process definitely piqued my interest in the subject, hence why I chose to continue studying it in my final year, even though the final year paper is a paper which is notorious for being difficult. See [[COMP716]]

**Implementation:**

![[Pasted image 20260415222627.png]]


## Code

```java
import java.util.Random;
import java.util.Scanner;
 
/**
 *
 * @author George
 */
// Problems with code:
// Integer overflow - doesn't check for overflow
// Possible divide by 0
// Program relies on user input to be correct 
public class MultiplicationCipher2 {

    private static final int MIN_KEY_LENGTH = 1;
    private static final int MAX_KEY_LENGTH = 20;

    public static void main(String[] args) {
        Scanner s = new Scanner(System.in);
        
        try {
            while (true) {
                runDialog(s);
            }
        } catch (RuntimeException e) {
            System.out.println("Program End");
        } finally {
            s.close();
        }
    }

    private static void runDialog(Scanner s) {
        String option = "";
        try {
            do {
                System.out.println("(1)Encrypt  (2)Decrypt   (3)Generate Key    (q)Quit");
                option = s.nextLine();
            } while (!option.equals("1") && !option.equals("2") && !option.equals("3") && !option.equals("q"));
        } catch (Exception e) {
            System.out.println("Exception");
        }

        switch (option) {
            case "1":
                encryptMessage(s);
                break;
            case "2":
                decryptMessage(s);
                break;
            case "3":
                generateKey(s);
                break;
            case "q":
                System.out.println("Quitting");
                throw new RuntimeException();
            default:
                System.out.println("Error");
                break;
        }
    }

    private static void encryptMessage(Scanner s) {
        String message = "";
        String key = "";
        try {
            System.out.println("Enter your message:");
            message = s.nextLine();
            key = readKey(s);
            if (key == null) return;
        } catch (Exception e) {
            System.out.println("Enter valid input");
            return;
        }
        System.out.println("Encoding..");
        String encoded = encodeMessage(message, key);
        System.out.println(encoded);
    }

    public static void decryptMessage(Scanner s) {
        String message = "";
        String key = "";
        try {
            System.out.println("Enter your message:");
            message = s.nextLine();
            key = readKey(s);
            if (key == null) return;
        } catch (Exception e) {
            System.out.println("Enter valid input");
            return;
        }
        System.out.println("Decoding..");
        String decoded = decodeMessage(message, key);
        if (!decoded.isEmpty()) {
            System.out.println(decoded);
        }
    }

    private static String readKey(Scanner s) {
        System.out.println("Enter Key");
        String key = s.nextLine();

        if (key.length() < MIN_KEY_LENGTH || key.length() > MAX_KEY_LENGTH) {
            System.out.println("Key length must be between " + MIN_KEY_LENGTH + " and " + MAX_KEY_LENGTH);
            return null;
        }
        if (getHex(key) == 0) {
            System.out.println("Invalid key: sum of ASCII values cannot be zero.");
            return null;
        }
        return key;
    }

    private static String encodeMessage(String m, String key) {
        char[] charArr = m.toCharArray(); // Split message into single characters
        long[] intArr = getHex(charArr); // Turn char array into numeric array

        StringBuilder finalString = new StringBuilder();
        long keyNum = getHex(key); // turn key to number

        int[] shifts = generateShiftPattern(key, intArr.length);

        // Times by hex of certain key, then shift
        for (int i = 0; i < intArr.length; i++) {
            long multiplied = intArr[i] * keyNum;
            long shifted = multiplied + shifts[i];
            finalString.append(shifted);
            if (i != intArr.length - 1) {
                finalString.append("-"); // Add delimiter
            }
        }
        return finalString.toString();
    }

    // Get numeric values from char array
    private static long[] getHex(char[] encoded) {
        long[] intArr = new long[encoded.length];
        for (int i = 0; i < encoded.length; i++) {
            intArr[i] = encoded[i];
        }
        return intArr;
    }

    // Convert key string to a single numeric value
    private static long getHex(String key) {
        long sum = 0;
        for (char c : key.toCharArray()) {
            sum += c;
        }
        return sum;
    }

    // Reverse of encode
    private static String decodeMessage(String m, String key) {
        StringBuilder decoded = new StringBuilder();
        long keyNum = getHex(key);

        if (keyNum == 0) {
            System.out.println("Error: Division by zero (invalid key).");
            return "";
        }

        try {
            String[] parts = m.split("-"); // Split by delimiter
            int[] shifts = generateShiftPattern(key, parts.length);

            for (int i = 0; i < parts.length; i++) {
                long value = Long.parseLong(parts[i]);
                long unshifted = value - shifts[i];
                long original = unshifted / keyNum; // Reverse the multiplication
                decoded.append((char) original); // Convert ASCII to char
            }
        } catch (NumberFormatException e) {
            System.out.println("Invalid encoded message format.");
            return "";
        }
        return decoded.toString();
    }

    private static int[] generateShiftPattern(String key, int length) {
        int[] shifts = new int[length];
        Random rand = new Random(key.hashCode());
        for (int i = 0; i < length; i++) {
            shifts[i] = rand.nextInt(50) + 1;
        }
        return shifts;
    }

    // Method to randomly generate key
    private static void generateKey(Scanner s) {
        int keyLen;
        do {
            System.out.println("Key Length?.....");
            while (!s.hasNextInt()) {
                System.out.println("Please enter a number.");
                s.next();
            }
            keyLen = s.nextInt();
            s.nextLine(); // consume newline
        } while (keyLen < MIN_KEY_LENGTH || keyLen > MAX_KEY_LENGTH);

        // Define the possible characters for the key
        String possibleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
                + "abcdefghijklmnopqrstuvwxyz"
                + "0123456789"
                + "!@#$%^&*()-_=+";

        char[] charSet = possibleChars.toCharArray();
        Random rand = new Random();
        StringBuilder key = new StringBuilder();

        // Build random string of length keyLen
        for (int i = 0; i < keyLen; i++) {
            int index = rand.nextInt(charSet.length);
            key.append(charSet[index]);
        }

        System.out.println("Key: " + key);
    }
}

```