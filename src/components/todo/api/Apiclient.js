import axios from "axios";
import { useKeycloak } from "@react-keycloak/web";
import { UserService } from "../security/keycloak";


export const apiClient = axios.create(
    {
        baseURL: 'http://localhost:8080/users/'
    }
)

  