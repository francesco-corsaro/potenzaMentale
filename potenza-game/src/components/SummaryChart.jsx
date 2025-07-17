import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts'

function SummaryChart() {
  const [data, setData] = useState([])

  useEffect(() => {
    const stats = JSON.parse(localStorage.getItem('stats') || '{"correct":0,"wrong":0}')
    setData([
      { name: 'Corrette', value: stats.correct },
      { name: 'Sbagliate', value: stats.wrong }
    ])
  }, [])

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default SummaryChart
