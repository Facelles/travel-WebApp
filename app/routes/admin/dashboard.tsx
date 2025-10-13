import { Header } from "../../../components";

const Dashboard = () => {
  const user = { name: 'David' };
  return (
    <main className='dashboard wrapper'>
      <Header
        title={`Welcome back, ${user?.name || 'User'} 👋`}
        descprition="Trakck your activity, trends and popular destinations"
      />

      Dashboard Page Contents


    </main>
  )
}

export default Dashboard