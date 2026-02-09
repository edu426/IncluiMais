import { useState } from 'react';
import * as XLSX from 'xlsx';

// Sample student data for testing
const sampleStudents = [
    {
        id: 1,
        nome: 'João Silva',
        email: 'joao@example.com',
        turma: '10A',
        idade: 16,
        telefone: '912345678'
    },
    {
        id: 2,
        nome: 'Maria Santos',
        email: 'maria@example.com',
        turma: '10B',
        idade: 15,
        telefone: '923456789'
    },
    {
        id: 3,
        nome: 'Pedro Costa',
        email: 'pedro@example.com',
        turma: '11A',
        idade: 17,
        telefone: '934567890'
    },
    {
        id: 4,
        nome: 'Ana Oliveira',
        email: 'ana@example.com',
        turma: '10A',
        idade: 16,
        telefone: '945678901'
    },
    {
        id: 5,
        nome: 'Carlos Ferreira',
        email: 'carlos@example.com',
        turma: '11B',
        idade: 18,
        telefone: '956789012'
    }
];

export default function ExcelTest() {
    const [students, setStudents] = useState(sampleStudents);
    const [message, setMessage] = useState('');

    // Export all students to Excel
    const exportToExcel = () => {
        try {
            // Create worksheet from student data
            const ws = XLSX.utils.json_to_sheet(students);

            // Create workbook and add the worksheet
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Alunos');

            // Generate filename with current date
            const date = new Date().toISOString().split('T')[0];
            const filename = `Alunos_${date}.xlsx`;

            // Save the file
            XLSX.writeFile(wb, filename);

            setMessage(`Excel file "${filename}" downloaded successfully!`);
            setTimeout(() => setMessage(''), 3000);
        } catch (error: any) {
            setMessage(`Error: ${error.message}`);
        }
    };

    // Export with custom columns
    const exportCustomColumns = () => {
        try {
            // Select only specific fields
            const customData = students.map(student => ({
                'ID': student.id,
                'Nome': student.nome,
                'Email': student.email,
                'Turma': student.turma
            }));

            const ws = XLSX.utils.json_to_sheet(customData);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Alunos_Resumo');

            XLSX.writeFile(wb, 'Alunos_Resumo.xlsx');

            setMessage('Custom Excel file downloaded!');
            setTimeout(() => setMessage(''), 3000);
        } catch (error: any) {
            setMessage(`Error: ${error.message}`);
        }
    };

    // Add a new test student
    const addTestStudent = () => {
        const newId = Math.max(...students.map(s => s.id)) + 1;
        const newStudent = {
            id: newId,
            nome: `Test Student ${newId}`,
            email: `test${newId}@example.com`,
            turma: '12A',
            idade: 18,
            telefone: '999999999'
        };
        setStudents([...students, newStudent]);
        setMessage(`Added ${newStudent.nome}`);
        setTimeout(() => setMessage(''), 2000);
    };

    return (
        <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#333' }}>
                Excel Export Test
            </h1>

            {/* Status message */}
            {message && (
                <div style={{
                    padding: '1rem',
                    marginBottom: '1rem',
                    backgroundColor: message.includes('❌') ? '#fee' : '#efe',
                    border: `1px solid ${message.includes('❌') ? '#faa' : '#afa'}`,
                    borderRadius: '4px',
                    color: message.includes('❌') ? '#c00' : '#060'
                }}>
                    {message}
                </div>
            )}

            {/* Export buttons */}
            <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button
                    onClick={exportToExcel}
                    style={{
                        padding: '0.75rem 1.5rem',
                        backgroundColor: '#10b981',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        transition: 'background-color 0.2s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#059669'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#10b981'}
                >
                    Export All Data
                </button>

                <button
                    onClick={exportCustomColumns}
                    style={{
                        padding: '0.75rem 1.5rem',
                        backgroundColor: '#3b82f6',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        transition: 'background-color 0.2s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
                >
                    Export Custom (ID, Nome, Email, Turma)
                </button>

                <button
                    onClick={addTestStudent}
                    style={{
                        padding: '0.75rem 1.5rem',
                        backgroundColor: '#8b5cf6',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        transition: 'background-color 0.2s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#7c3aed'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#8b5cf6'}
                >
                    Add Test Student
                </button>
            </div>

            {/* Student table */}
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#555' }}>
                Current Students ({students.length})
            </h2>

            <div style={{ overflowX: 'auto' }}>
                <table style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    backgroundColor: 'white',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f9fafb' }}>
                            <th style={headerStyle}>ID</th>
                            <th style={headerStyle}>Nome</th>
                            <th style={headerStyle}>Email</th>
                            <th style={headerStyle}>Turma</th>
                            <th style={headerStyle}>Idade</th>
                            <th style={headerStyle}>Telefone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student, index) => (
                            <tr
                                key={student.id}
                                style={{
                                    backgroundColor: index % 2 === 0 ? 'white' : '#f9fafb'
                                }}
                            >
                                <td style={cellStyle}>{student.id}</td>
                                <td style={cellStyle}>{student.nome}</td>
                                <td style={cellStyle}>{student.email}</td>
                                <td style={cellStyle}>{student.turma}</td>
                                <td style={cellStyle}>{student.idade}</td>
                                <td style={cellStyle}>{student.telefone}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Instructions */}
            <div style={{
                marginTop: '2rem',
                padding: '1rem',
                backgroundColor: '#f0f9ff',
                border: '1px solid #bae6fd',
                borderRadius: '6px'
            }}>
                <h3 style={{ marginTop: 0, color: '#0369a1' }}>💡 How to use:</h3>
                <ul style={{ color: '#0c4a6e', lineHeight: '1.6' }}>
                    <li><strong>Export All Data:</strong> Downloads an Excel file with all student information</li>
                    <li><strong>Export Custom:</strong> Downloads only selected columns (ID, Nome, Email, Turma)</li>
                    <li><strong>Add Test Student:</strong> Adds a new test student to the table</li>
                </ul>
            </div>
        </div>
    );
}

// Styles
const headerStyle = {
    padding: '0.75rem',
    textAlign: 'left' as const,
    borderBottom: '2px solid #e5e7eb',
    fontWeight: 'bold',
    color: '#374151'
};

const cellStyle = {
    padding: '0.75rem',
    borderBottom: '1px solid #e5e7eb',
    color: '#6b7280'
};
