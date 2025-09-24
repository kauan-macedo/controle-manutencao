package com.controlemanutencao.service;

import com.controlemanutencao.exception.CEPInvalidoException;
import com.controlemanutencao.model.EnderecoViaCep;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Optional;

@Service
public class ViaCEPService {

    public EnderecoViaCep buscarCEP(String cep) {
        String url = "https://viacep.com.br/ws/01001000/json/";
        try (HttpClient client = HttpClient.newHttpClient()) {

            HttpRequest request = HttpRequest.newBuilder().uri(URI.create(url)).GET().build();
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            ObjectMapper mapper = new ObjectMapper();
            EnderecoViaCep endereco = mapper.readValue(response.body(), EnderecoViaCep.class);

            return endereco;
        }catch (Exception ex) {
            throw new CEPInvalidoException("CEP inválido");
        }
    }

}
