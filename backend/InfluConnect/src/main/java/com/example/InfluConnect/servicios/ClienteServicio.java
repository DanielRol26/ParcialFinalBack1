package com.example.InfluConnect.servicios;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.InfluConnect.modelos.Cliente;
import com.example.InfluConnect.repositorios.IClienteRepositorio;

@Service
public class ClienteServicio {

    @Autowired
    private IClienteRepositorio clienteRepositorio;

    // POST
    // Guardar un registro en la tabla clientes
    public Cliente guardarCliente(Cliente cliente) {
        Cliente clienteGuardado = clienteRepositorio.save(cliente);
        return clienteGuardado;
    }

    // GET
    // Buscar todos los registros de la tabla
    public List<Cliente> buscarClientes() {
        List<Cliente> clientes = clienteRepositorio.findAll();
        return clientes;
    }

    // GET
    // Buscar un registro por su id
    public Cliente buscarClientePorId(Long id) {
        Optional<Cliente> clienteBuscado = clienteRepositorio.findById(id);
        if (clienteBuscado.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "El cliente que buscas no existe en la BD");
        }
        return clienteBuscado.get();
    }

    // PUT
    // Actualizar un registro por id
    public Cliente actualizarCliente(Long id, Cliente cliente) {
        Optional<Cliente> clienteBuscado = clienteRepositorio.findById(id);
        if (clienteBuscado.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "El cliente que buscas no existe en la BD");
        }
        Cliente clienteEncontradoEnLaBD = clienteRepositorio.save(cliente);
        clienteEncontradoEnLaBD.setNombre(cliente.getNombre());
        clienteEncontradoEnLaBD.setApellido(cliente.getApellido());
        clienteEncontradoEnLaBD.setEmail(cliente.getEmail());
        clienteEncontradoEnLaBD.setTelefono(cliente.getTelefono());
        clienteEncontradoEnLaBD.setCiudad(cliente.getCiudad());
        return clienteRepositorio.save(clienteEncontradoEnLaBD);
    }

    //DELETE
    // Eliminar un registro por id
    public Boolean eliminarCliente(Long id) {
        Optional<Cliente> clienteBuscado = clienteRepositorio.findById(id);
        if (clienteBuscado.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "El cliente que buscas no existe en la BD");
        }
        clienteRepositorio.deleteById(id);
        return true;
    }
}
