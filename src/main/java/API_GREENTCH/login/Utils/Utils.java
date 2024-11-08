package API_GREENTCH.login.Utils;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class Utils {
    	public static String sha256(String input) {
        try {
            // Cria uma instância do MessageDigest para SHA-256
            MessageDigest digest = MessageDigest.getInstance("SHA-256");

            // Calcula o hash em bytes
            byte[] hashBytes = digest.digest(input.getBytes());

            // Converte os bytes para uma representação hexadecimal
            StringBuilder hexString = new StringBuilder();
            for (byte b : hashBytes) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) hexString.append('0');
                hexString.append(hex);
            }
            return hexString.toString();

        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Erro ao calcular SHA-256", e);
        }
    }
}
