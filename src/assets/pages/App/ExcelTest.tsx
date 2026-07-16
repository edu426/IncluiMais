import { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { Link, useNavigate } from 'react-router-dom';
import './ExcelTest.css';
import IsLoggedIn from '../../functions/IsLoggedIn';
import { useUser } from '@clerk/clerk-react';

interface Student {
    id: string;
    nome: string;
    turma: string;
    notas: string;
    professorId: string;
    diretorTurma: string;
}

export default function ExcelTest() {
    const { user } = useUser();
    const navigate = useNavigate();
    const [students, setStudents] = useState<Student[]>([]);
    const [professorId, setProfessorId] = useState('');
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState<'success' | 'error'>('success');

    useEffect(() => {
        if (user) {
            fetch("/api/sync", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ clerkId: user.id }),
            })
                .then((res) => res.json())
                .then((data) => {
                    setProfessorId(data.id);
                })
                .catch((err) => {
                    console.error("Erro ao sincronizar:", err);
                });
        }
    }, [user]);

    useEffect(() => {
        if (!professorId) return;
        setLoading(true);
        fetch(`/api/alunos/${professorId}`)
            .then((res) => res.json())
            .then((data) => setStudents(data))
            .catch((err) => console.error("Erro ao buscar alunos:", err))
            .finally(() => setLoading(false));
    }, [professorId]);

    // Exportar todos os alunos para Excel
    const exportToExcel = () => {
        if (students.length === 0) {
            showMessage('Não existem alunos para exportar.', 'error');
            return;
        }
        try {
            const studentData = students.map(student => ({
                'Nome': student.nome,
                'Turma': student.turma,
                'Diagnóstico': student.notas,
                'Diretor de Turma': student.diretorTurma
            }));
            const ws = XLSX.utils.json_to_sheet(studentData);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Alunos');
            const date = new Date().toISOString().split('T')[0];
            const filename = `Alunos_${date}.xlsx`;
            XLSX.writeFile(wb, filename);
            showMessage(`Ficheiro "${filename}" descarregado com sucesso!`, 'success');
        } catch (error: any) {
            showMessage(`Erro ao exportar: ${error.message}`, 'error');
        }
    };

    const refreshData = async () => {
        if (!professorId) return;
        setLoading(true);
        try {
            const response = await fetch(`/api/alunos/${professorId}`);
            if (!response.ok) throw new Error('Failed to fetch');
            const data = await response.json();
            setStudents(data);
            showMessage('Dados atualizados com sucesso!', 'success');
        } catch {
            showMessage('Erro ao ligar ao backend.', 'error');
        } finally {
            setLoading(false);
        }
    };

    const showMessage = (msg: string, type: 'success' | 'error') => {
        setMessage(msg);
        setMessageType(type);
        setTimeout(() => setMessage(''), 3000);
    };

    // Contar turmas únicas
    const turmasUnicas = new Set(students.map(s => s.turma)).size;

    if (loading) {
        return <div className="excel-loading">A carregar dados...</div>;
    }

    return (
        <IsLoggedIn>
            <div className="excel-container">
                {/* ── Back Button ── */}
                <button onClick={() => navigate(-1)} className="excel-back-btn">
                    <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_back</span>
                    Voltar
                </button>

                {/* ── Header ── */}
                <header className="excel-header">
                    <div>
                        <h1>Exportar Dados</h1>
                        <p className="excel-header-sub">Exporta os dados de todos os teus alunos para um ficheiro Excel.</p>
                    </div>
                    <div className="excel-actions">
                        <button onClick={exportToExcel} className="excel-btn primary">
                            <span className="material-symbols-outlined">download</span>
                            Exportar Tudo
                        </button>
                        <button onClick={refreshData} className="excel-btn secondary">
                            <span className="material-symbols-outlined">refresh</span>
                            Atualizar
                        </button>
                    </div>
                </header>

                {/* ── Toast Message ── */}
                {message && (
                    <div className={`excel-toast ${messageType}`}>
                        <span className="material-symbols-outlined">
                            {messageType === 'success' ? 'check_circle' : 'error'}
                        </span>
                        {message}
                    </div>
                )}

                {/* ── Stats Row ── */}
                <section className="excel-stats">
                    <div className="excel-stat-card">
                        <div className="excel-stat-icon" style={{ backgroundColor: '#e0e7ff', color: '#4f46e5' }}>
                            <span className="material-symbols-outlined">school</span>
                        </div>
                        <div className="excel-stat-info">
                            <h3>{students.length}</h3>
                            <p>Total de Alunos</p>
                        </div>
                    </div>
                    <div className="excel-stat-card">
                        <div className="excel-stat-icon" style={{ backgroundColor: '#e6f0fa', color: '#1F4E79' }}>
                            <span className="material-symbols-outlined">groups</span>
                        </div>
                        <div className="excel-stat-info">
                            <h3>{turmasUnicas}</h3>
                            <p>Turmas</p>
                        </div>
                    </div>
                    <div className="excel-stat-card">
                        <div className="excel-stat-icon" style={{ backgroundColor: '#d1fae5', color: '#059669' }}>
                            <span className="material-symbols-outlined">table_chart</span>
                        </div>
                        <div className="excel-stat-info">
                            <h3>{students.length > 0 ? 4 : 0}</h3>
                            <p>Colunas no Excel</p>
                        </div>
                    </div>
                </section>

                {/* ── Table Panel ── */}
                <div className="excel-panel">
                    <div className="excel-panel-header">
                        <h2>Pré-visualização dos Dados</h2>
                        <Link to="/ver-todos-alunos" className="excel-btn secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                            <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>visibility</span>
                            Ver Todos
                        </Link>
                    </div>

                    {students.length === 0 ? (
                        <div className="excel-empty">
                            <span className="material-symbols-outlined" style={{ fontSize: '3rem', marginBottom: '0.5rem', display: 'block' }}>folder_off</span>
                            <p>Ainda não tens alunos registados.</p>
                        </div>
                    ) : (
                        <div className="excel-table-wrap">
                            <table className="excel-table">
                                <thead>
                                    <tr>
                                        <th>Nome</th>
                                        <th>Turma</th>
                                        <th>Diagnóstico</th>
                                        <th>Diretor de Turma</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {students.map((student) => (
                                        <tr key={student.id}>
                                            <td className="td-nome">{student.nome}</td>
                                            <td><span className="td-turma">{student.turma}</span></td>
                                            <td className="td-diagnostico">{student.notas || '—'}</td>
                                            <td>{student.diretorTurma || 'N/A'}</td>
                                            <td>
                                                <Link to={`/exportar-aluno/${student.id}`} className="excel-link-edit">
                                                    <span className="material-symbols-outlined">file_download</span>
                                                    Individual
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

            </div>
        </IsLoggedIn>
    );
}