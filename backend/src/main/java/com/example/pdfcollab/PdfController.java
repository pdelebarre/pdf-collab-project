package com.example.pdfcollab;

import java.io.IOException;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import okhttp3.MediaType;
import okhttp3.MultipartBody;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

@RestController
@RequestMapping("/api")
public class PdfController {
    private static final String PSPDFKIT_SERVER_URL = "http://localhost:5000";
    private static final String API_TOKEN = "YOUR_PSPDFKIT_API_TOKEN";

    @PostMapping("/upload")
    public String uploadPdf(@RequestParam("file") MultipartFile file) throws IOException {
        OkHttpClient client = new OkHttpClient();
        RequestBody body = new MultipartBody.Builder()
                .setType(MultipartBody.FORM)
                .addFormDataPart("file", file.getOriginalFilename(),
                        RequestBody.create(file.getBytes(), MediaType.parse("application/pdf")))
                .build();

        Request request = new Request.Builder()
                .url(PSPDFKIT_SERVER_URL + "/api/documents")
                .addHeader("Authorization", "Token " + API_TOKEN)
                .post(body)
                .build();

        Response response = client.newCall(request).execute();
        return response.body().string();
    }
}