import {OrganizationRoleInfo} from './organization-role-info';

export class OrganizationMember {
  memberId: number;
  firstName: string;
  middleName: string;
  lastName: string;
  roles: OrganizationRoleInfo[];
}
