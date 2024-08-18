import Sidebar from '../components/Sidebar'
import Table from '../components/Table'

const AdminTable = () => {
  return (
    <div className='flex h-screen'>
        <Sidebar/>
        <Table data={[]}/>
    </div>
  )
}

export default AdminTable