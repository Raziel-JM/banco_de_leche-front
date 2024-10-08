import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_DONANTE } from '../graphql/Queries';
import moment from 'moment';

const DonanteDetails = () => {
  const { id } = useParams();  // Aquí usa `id`
  const { loading, error, data } = useQuery(GET_DONANTE, {
    variables: { id },  // Asegúrate de que coincida con la variable de la consulta
  });

  if (loading) return "Cargando detalles de la donante...";
  if (error) return `Error: ${error.message}`;

  if (!data || !data.donante) {
    return <div>No se encontraron detalles de la donante.</div>;
  }

  const donante = data.donante;

  return (
    <div className="container">
      <div className="d-flex justify-content-between flex-wrap flex-md nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">{donante.lastName} {donante.firstName}</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <div className="btn-group me-2">
            <Link to={`/agregarControl/${donante._id}`} className="btn btn-sm btn-primary">
              Agregar Control
            </Link>
          </div>
        </div>
      </div>

      <div className="col py-3">
        <div className="row">
          <div className="col">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Registro Donadoras</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  {donante.lastName} {donante.firstName}
                </li>
              </ol>
            </nav>
          </div>
          <div className="col text-end fw-lighter">
            <b>Última Actualización: {moment(donante.updatedAt).format('llll [hrs]')}</b>
          </div>
        </div>
      </div>

      <ul className="list-group">
        <li className="list-group-item">
          <div className="row">
            <div className="col" style={{ maxWidth: '140px' }}>
              <b>Tipo:</b>
            </div>
            <div className="col">{donante.tipo}</div>
          </div>
        </li>
        <li className="list-group-item">
          <div className="row">
            <div className="col" style={{ maxWidth: '140px' }}>
              <b>Apellidos:</b>
            </div>
            <div className="col">{donante.lastName}</div>
          </div>
        </li>
        <li className="list-group-item">
          <div className="row">
            <div className="col" style={{ maxWidth: '140px' }}>
              <b>Nombre:</b>
            </div>
            <div className="col">{donante.firstName}</div>
          </div>
        </li>
        <li className="list-group-item">
          <div className="row">
            <div className="col" style={{ maxWidth: '140px' }}>
              <b>sdg</b>
            </div>
            <div className="col">{donante.sdg}</div>
          </div>
        </li>
        <li className="list-group-item">
          <div className="row">
            <div className="col" style={{ maxWidth: '140px' }}><b>Fecha de Creación:</b></div>
            <div className="col">{new Date(donante.createdAt).toLocaleString()}</div>
          </div>
        </li>
        <li className="list-group-item">
          <div className="row">
            <div className="col" style={{ maxWidth: '140px' }}><b>Última Modificación:</b></div>
            <div className="col">{new Date(donante.updatedAt).toLocaleString()}</div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default DonanteDetails;
