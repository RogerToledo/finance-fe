import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
    labels: ['usado', 'disponível'],
    datasets: [{
        label: 'Orçamento',
        data: [75, 25],
        backgroundColor: [
            'rgba(255, 99, 71, 0.6)',
            'rgba(54, 162, 235, 0.6)',
        ],
        borderColor: [
            'rgba(54, 54, 54, 1)',
        ],
        borderWidth: 1,
    }]
}

const options = {
    responsive: true,
    maintainAspectRatio: false, //Permite customizar a proporção do grafico.
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Orçamento',
            font: {
                size: 16,
            }    
        },
    },   
}

function Dashboar() {
    return (
        <div>
            <div className="grid grid-cols-4 gap-4 p-4">
                <div className="col-span-1 bg-gray-200 dark:bg-gray-700 p-4 rounded">
                  <div>
                    <h1>Orçamento</h1>
                  </div>
                  <div>
                    <Doughnut data={data} options={options} />
                  </div>
                </div>
                <div className="col-span-1 bg-gray-200 dark:bg-gray-700 p-4 rounded">
                    <h1>Parcelamento</h1>
                    <br />
                    <p>Compras parceladas: 3 </p>
                    <p>Total de parcelas: 10</p>
                    <p>Valor total: R$ 1.000,00</p>
                </div>
                <div className="col-span-1 bg-gray-200 dark:bg-gray-700 p-4 rounded">Coluna 3</div>
                <div className="col-span-1 bg-gray-200 dark:bg-gray-700 p-4 rounded">Coluna 4</div>
            </div>
            <div className="grid grid-cols-1 gap-4 p-4">
                <div className="col-span-1 bg-gray-200 dark:bg-gray-700 p-4 rounded">Coluna Única</div>
            </div>
        </div>
    );
}

export default Dashboar;