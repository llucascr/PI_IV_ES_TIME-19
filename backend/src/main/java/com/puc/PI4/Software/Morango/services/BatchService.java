package com.puc.PI4.Software.Morango.services;

import com.puc.PI4.Software.Morango.repositories.BatchRepository;
import com.puc.PI4.Software.Morango.repositories.ClientRepository;
import com.puc.PI4.Software.Morango.repositories.OrganizationRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class BatchService {

    private final ClientRepository clientRepository;
    private final OrganizationRepository organizationRepository;
    private final BatchRepository batchRepository;

    private final ModelMapper modelMapper;
}
