package com.collegeerp.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import jakarta.annotation.PostConstruct;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;

/**
 * FirebaseConfig — Initializes the Firebase Admin SDK on application startup.
 *
 * Credentials are read from environment variables:
 *   FIREBASE_PROJECT_ID, FIREBASE_PRIVATE_KEY, FIREBASE_CLIENT_EMAIL
 */
@Configuration
public class FirebaseConfig {

    private static final Logger log = LoggerFactory.getLogger(FirebaseConfig.class);

    @Value("${firebase.project-id:}")
    private String projectId;

    @Value("${firebase.private-key:}")
    private String privateKey;

    @Value("${firebase.client-email:}")
    private String clientEmail;

    @PostConstruct
    public void initFirebase() throws IOException {
        if (projectId == null || projectId.trim().isEmpty() || projectId.contains("your-") ||
            privateKey == null || privateKey.trim().isEmpty() || privateKey.contains("YOUR_") ||
            clientEmail == null || clientEmail.trim().isEmpty() || clientEmail.contains("your-")) {
            log.warn("⚠️ Firebase credentials are not fully configured. Skipping Firebase Admin SDK initialization. " +
                     "Some authentication features will not function.");
            return;
        }

        if (FirebaseApp.getApps().isEmpty()) {
            String serviceAccountJson = buildServiceAccountJson();
            InputStream serviceAccount = new ByteArrayInputStream(serviceAccountJson.getBytes());

            FirebaseOptions options = FirebaseOptions.builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .setProjectId(projectId)
                    .build();

            FirebaseApp.initializeApp(options);
            log.info("✅ Firebase Admin SDK initialized successfully.");
        }
    }

    private String buildServiceAccountJson() {
        return String.format("""
            {
              "type": "service_account",
              "project_id": "%s",
              "private_key": "%s",
              "client_email": "%s",
              "token_uri": "https://oauth2.googleapis.com/token"
            }
            """, projectId, privateKey.replace("\\n", "\n"), clientEmail);
    }
}
