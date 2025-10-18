import axiosInstance from "./axiosInstance";

class AdminService {
  public async createCatagory(data:any,token:string) {
    console.log("token is in adminservice",token)
    try {
      const res = await axiosInstance.post(`/course/createCategory`,data,
         {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
      )
      return res.data;
    } catch (error: any) {
      throw error;
    }
  }

  public async createCourse(data:any, token:string) {
    try {
      const res = await axiosInstance.post(`/admin/createCourse}`,data,
         {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
      )
      return res.data;
    } catch (error: any) {
      throw error;
    }
  }

  public async getAllCatagory(token:string) {
    try {
      const res = await axiosInstance.get(`/course/showAllCategories`,
         {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
      )
      return res.data;
    } catch (error: any) {
      throw error;
    }
  }
 
}

export const adminService = new AdminService();
