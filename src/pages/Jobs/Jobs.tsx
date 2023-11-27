import React, { useState } from 'react';
import { Box, TextField, Select, MenuItem, Button } from '@mui/material';
import 'tailwindcss/tailwind.css';

interface Vaga {
    id: number;
    empresa: string;
    codigoEmpresa: string;
    area: string;
    vaga: string;
    deficiencia: string;
}

const Jobs: React.FC = () => {
    const [vagas, setVagas] = useState<Vaga[]>([
        { id: 1, empresa: 'Empresa A', codigoEmpresa: '123', area: 'TI', vaga: 'Desenvolvedor', deficiencia: 'Nenhuma' },
        { id: 2, empresa: 'Empresa B', codigoEmpresa: '456', area: 'RH', vaga: 'Recrutador', deficiencia: 'Visual' },
        { id: 3, empresa: 'Empresa C', codigoEmpresa: '789', area: 'Marketing', vaga: 'Especialista em Marketing', deficiencia: 'Auditiva' },
        { id: 4, empresa: 'Empresa D', codigoEmpresa: '101', area: 'TI', vaga: 'Analista de Dados', deficiencia: 'Nenhuma' },
        { id: 5, empresa: 'Empresa E', codigoEmpresa: '112', area: 'Financeiro', vaga: 'Analista Financeiro', deficiencia: 'Nenhuma' }
        // Adicione mais dados conforme necessário
    ]);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(5);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = vagas.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <Box p={4}>
            <h1 className="text-lg font-bold mb-2 text-blue-500">Vagas de Emprego</h1>

            <Box display="flex" gap={2} mb={2}>
                <TextField variant="outlined" size="small" fullWidth placeholder="Nome da Vaga" />
                <Select variant="outlined" size="small" fullWidth>
                    <MenuItem value="opcao1">Opção 1</MenuItem>
                    <MenuItem value="opcao2">Opção 2</MenuItem>
                </Select>
            </Box>

            <Box display="flex" gap={2} mb={2}>
                <Select variant="outlined" size="small" fullWidth>
                    <MenuItem value="nenhuma">Nenhuma</MenuItem>
                    <MenuItem value="visual">Visual</MenuItem>
                    <MenuItem value="auditiva">Auditiva</MenuItem>
                </Select>
                <Select variant="outlined" size="small" fullWidth>
                    <MenuItem value="ti">TI</MenuItem>
                    <MenuItem value="rh">RH</MenuItem>
                    <MenuItem value="marketing">Marketing</MenuItem>
                </Select>
                <Select variant="outlined" size="small" fullWidth>
                    <MenuItem value="empresaA">Empresa A</MenuItem>
                    <MenuItem value="empresaB">Empresa B</MenuItem>
                    <MenuItem value="empresaC">Empresa C</MenuItem>
                </Select>
            </Box>

            <ul>
                <li className="flex mb-2 border-b">
                    <p className="w-1/5 font-bold text-sm">Cód. Empresa</p>
                    <p className="w-1/5 font-bold text-sm">Empresa</p>
                    <p className="w-1/5 font-bold text-sm">Área</p>
                    <p className="w-1/5 font-bold text-sm">Vaga</p>
                    <p className="w-1/5 font-bold text-sm">Deficiência</p>
                </li>
                {currentItems.map((vaga) => (
                    <li key={vaga.id} className="flex mb-2 border-b">
                        <p className="w-1/5 text-sm">{vaga.codigoEmpresa}</p>
                        <p className="w-1/5 text-sm">{vaga.empresa}</p>
                        <p className="w-1/5 text-sm">{vaga.area}</p>
                        <p className="w-1/5 text-sm">{vaga.vaga}</p>
                        <p className="w-1/5 text-sm">{vaga.deficiencia}</p>
                    </li>
                ))}
            </ul>

            <Box mt={2} display="flex" justifyContent="space-between">
                <p className="text-sm">{`Mostrando ${indexOfFirstItem + 1} - ${indexOfLastItem} de ${vagas.length} itens`}</p>
                <div>
                    {Array.from({ length: Math.ceil(vagas.length / itemsPerPage) }).map((_, index) => (
                        <Button key={index} onClick={() => paginate(index + 1)} variant="outlined" size="small">
                            {index + 1}
                        </Button>
                    ))}
                </div>
            </Box>
        </Box>
    );
};

export default Jobs;