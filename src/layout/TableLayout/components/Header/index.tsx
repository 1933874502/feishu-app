import { faStar } from "@fortawesome/free-regular-svg-icons"
import {
  faAngleLeft,
  faFolder,
  faLink,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  Avatar,
  Box,
  Button,
  Header as HeaderContainer,
  Menu,
  Text,
} from "@mantine/core"
import UserCenterDropdown from "./components/UserCenterDropdown"

export default function Header() {
  return (
    <HeaderContainer height={64}>
      <Box className=" h-full pl-4 flex items-center justify-between">
        {/* 左边的区域 */}
        <Box className="h-full flex items-center ">
          <FontAwesomeIcon icon={faAngleLeft} />
          <Box className="flex flex-col gap-1 ml-5">
            {/* 表名+收藏 */}
            <Box className=" h-6 flex items-center">
              <Box className="text-sm px-1">💻团队日报汇总</Box>
              <Box className="w-5 h-5 hover:bg-slate-400 cursor-pointer flex items-center justify-center rounded-md">
                <FontAwesomeIcon icon={faStar} className="w-4 h-4" />
              </Box>
            </Box>
            {/* 我的空间+最近修改时间 */}
            <Box className="w-64 h-4 flex items-center">
              {/* 我的空间 */}
              <Box className="flex items-center gap-1 px-1">
                <FontAwesomeIcon
                  icon={faFolder}
                  color="#646A73"
                  className="w-3 h-3"
                />
                <Text className="text-xs text-#646A73">我的空间</Text>
                <Box style={{ width: "1px" }} className="h-3 bg-#DEE0E3 mx-2" />
                {/* 最近修改 */}
                <Text className="text-xs text-#646A73">最近修改：18分钟前</Text>
              </Box>
            </Box>
          </Box>
        </Box>
        {/* 右边的区域 */}
        <Box className=" h-full  flex items-center pr-4">
          {/* 3个按钮 */}
          <Box>
            <Button
              color="transparent"
              className="bg-#3370FF text-sm w-18 h-8 rounded-md"
              leftIcon={<FontAwesomeIcon icon={faLink} />}
            >
              分享
            </Button>
          </Box>
          <Menu>
            <Menu.Target>
              <Avatar color="#3370FF" className="rounded-full cursor-pointer">
                宇豪
              </Avatar>
            </Menu.Target>
            <Menu.Dropdown>
              <UserCenterDropdown />
            </Menu.Dropdown>
          </Menu>
        </Box>
      </Box>
    </HeaderContainer>
  )
}
