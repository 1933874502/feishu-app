import { useDispatch, useSelector } from "react-redux"
import {
  login as loginAction,
  logout as logoutAction,
} from "../store/slicers/user"
import { RootState } from "../store/index"

export default function useUserInfo() {
  const user = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()
  const login = async () => {
    dispatch(loginAction())
  }

  const logout = async () => {
    dispatch(logoutAction())
  }
  return { user, login, logout }
}
