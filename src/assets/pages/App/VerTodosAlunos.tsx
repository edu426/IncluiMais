import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import IsLoggedIn from '../../functions/IsLoggedIn';
import './VerAluno.css';

interface Student {
    id: string;
    nome: string;
    email: string;
    turma: string;
    notas: string;
    professorId: string;
}

export default function VerTodosAluno() {
    const [students, setStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Search and filter state
    const [searchQuery, setSearchQuery] = useState('');
    const [filterTurma, setFilterTurma] = useState('');

    // Fetch alunos do backend
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                setLoading(true);
                const response = await fetch('http://localhost:3000/api/alunos');
                if (!response.ok) throw new Error('Failed to fetch students');
                const data = await response.json();
                setStudents(data);
            } catch (err: any) {
                setError('Could not connect to backend. Make sure it is running on port 3000.');
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, []);

    // Unique list of turmas for the filter dropdown
    const turmas = useMemo(() =>
        [...new Set(students.map(s => s.turma))].sort()
    , [students]);

    // Filtered list — updates instantly as user types or picks a turma
    const filteredStudents = useMemo(() => {
        return students.filter(s => {
            const matchesName = s.nome.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesTurma = filterTurma === '' || s.turma === filterTurma;
            return matchesName && matchesTurma;
        });
    }, [students, searchQuery, filterTurma]);

    if (loading) {
        return <div className="ver-aluno-loading"> A carregar informações do aluno...</div>;
    }

    if (error || !students) {
        return <div className="ver-aluno-error"> {error || 'Ainda não existem alunos.'}</div>;
    }

    return (
        <IsLoggedIn>
            <div className="ver-todos-page">
                <Link to="/dashboard" className="back-link">← Voltar ao Dashboard</Link>

                <div className="ver-aluno-header">
                    <div>
                        <h1>Todos os Alunos</h1>
                        <p className="subtitle">
                            {filteredStudents.length === students.length
                                ? `${students.length} aluno${students.length !== 1 ? 's' : ''} registado${students.length !== 1 ? 's' : ''}.`
                                : `${filteredStudents.length} de ${students.length} alunos`}
                        </p>
                    </div>
                </div>

                {/* Search and filter bar */}
                <div className="search-bar">
                    <input
                        type="text"
                        className="search-input"
                        placeholder="🔍 Pesquisar por nome..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                    />
                    <select
                        className="filter-select"
                        value={filterTurma}
                        onChange={e => setFilterTurma(e.target.value)}
                    >
                        <option value="">Todas as Turmas</option>
                        {turmas.map(t => (
                            <option key={t} value={t}>{t}</option>
                        ))}
                    </select>
                    {(searchQuery || filterTurma) && (
                        <button className="btn-clear-filter" onClick={() => { setSearchQuery(''); setFilterTurma(''); }}>
                            ✕ Limpar
                        </button>
                    )}
                </div>

                <div className="alunos-grid">
                    {filteredStudents.map((student) => (
                        <div className="aluno-card-mini" key={student.id}>
                            <div className="info-row">
                                <span className="info-label">Nome</span>
                                <span className="info-value">{student.nome}</span>
                            </div>

                            <div className="info-row">
                                <span className="info-label">Email</span>
                                <span className="info-value">{student.email}</span>
                            </div>

                            <div className="info-row">
                                <span className="info-label">Turma</span>
                                <span className="info-value">{student.turma}</span>
                            </div>
                            <Link to={`/editar-aluno/${student.id}`} className="btn-view">
                                Editar
                            </Link>
                        </div>
                    ))}

                    {filteredStudents.length === 0 && (
                        <p className="faltas-empty">Nenhum aluno encontrado.</p>
                    )}
                </div>
            </div>
        </IsLoggedIn>
    );
}
