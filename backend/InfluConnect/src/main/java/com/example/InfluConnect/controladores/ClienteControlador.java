package com.example.InfluConnect.controladores;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.InfluConnect.modelos.Cliente;
import com.example.InfluConnect.servicios.ClienteServicio;

@RestController
@RequestMapping("/api/clientes")
public class ClienteControlador {

    @Autowired
    private ClienteServicio clienteServicio;

    @PostMapping
    public ResponseEntity<?>controlarGuardado(@RequestBody Cliente datos){
        return ResponseEntity.status(HttpStatus.OK).body(clienteServicio.guardarCliente(datos));
    }

    @GetMapping
    public ResponseEntity<?> controlarListado(){
        return ResponseEntity.status(HttpStatus.OK).body(clienteServicio.buscarClientes());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> controlarConsultaPorId(@PathVariable Long id){
        return ResponseEntity.status(HttpStatus.OK).body(clienteServicio.buscarClientePorId(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> controlarActualizacion(@PathVariable Long id, @RequestBody Cliente datos){
        return ResponseEntity.status(HttpStatus.OK).body(clienteServicio.actualizarCliente(id, datos));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> controlarEliminacion(@PathVariable Long id){
        return ResponseEntity.status(HttpStatus.OK).body(clienteServicio.eliminarCliente(id));
    }
}