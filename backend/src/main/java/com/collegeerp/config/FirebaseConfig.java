package com.collegeerp.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
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
 *
 * TODO (Phase 2): Finalize credential JSON construction and error handling.
 */
@Configuration
public class FirebaseConfig {

    @Value("${firebase.project-id}")
    private String projectId;

    @Value("${firebase.private-key}")
    private String privateKey;

    @Value("${firebase.client-email}")
    private String clientEmail;

    @PostConstruct
    public void initFirebase() throws IOException {
        if (FirebaseApp.getApps().isEmpty()) {
            String serviceAccountJson = buildServiceAccountJson();
            InputStream serviceAccount = new ByteArrayInputStream(serviceAccountJson.getBytes());

            FirebaseOptions options = FirebaseOptions.builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .setProjectId(projectId)
                    .build();

            FirebaseApp.initializeApp(options);
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
