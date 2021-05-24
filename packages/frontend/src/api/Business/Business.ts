import Owner from '@/api/User/Owner/Owner'
import Employee from '@/api/User/Employee/Employee'

interface IBusiness {
  id: string;
  name: string;
  owners: Owner[] | null;
  employees: Employee[];
}

export default class Business implements IBusiness {
  id = ''
  name = ''
  owners: Owner[] = []
  employees: Employee[] = []
}
