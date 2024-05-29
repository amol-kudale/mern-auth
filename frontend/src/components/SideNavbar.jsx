import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useSelector } from "react-redux";
import { signOut } from "../redux/user/userSlice";
import { Outlet, Navigate } from "react-router-dom";

import {
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Alert,
  Input,
  Drawer,
  Card,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  CubeTransparentIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
 
export function SidebarWithBurgerMenu() {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(0);
  const [openAlert, setOpenAlert] = React.useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(true);
 
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
 
  const openDrawer = () => {
    setIsDrawerOpen(prevState => !prevState);
  }
    
  //   setIsDrawerOpen(true);
  // const closeDrawer = () => setIsDrawerOpen(false);

  const { currentUser } = useSelector((state) => state.user);

  const handleSignOut = async () => {
    try {
      await fetch("api/auth/sign-out");
      dispatch(signOut());
    } catch (error) {
      console.log(error);
    }
  };
 
  return (
    <>
      {currentUser ? (
        <>
          <IconButton variant="text" size="lg" onClick={openDrawer}>
            {isDrawerOpen ? (
              <XMarkIcon className="  h-8 w-8 stroke-2" />
            ) : (
              <Bars3Icon className="  h-8 w-8 stroke-2" />
            )}
          </IconButton>
          {/* <Drawer className="side-nav-drawer  " open={isDrawerOpen} onClose={closeDrawer}> */}
          {isDrawerOpen && (
            <Card
              open={isDrawerOpen}
              color="transparent"
              shadow={false}
              className="side-nav-card h-[calc(100vh-2rem)]  p-4 "
            >
              {/* <IconButton variant="text" size="lg" onClick={closeDrawer}>
                    {isDrawerOpen ? (
                      <XMarkIcon className="  h-8 w-8 stroke-2" />
                    ) : (
                      <></>
                    )}
                  </IconButton> */}
              {/* <div className="mb-2 flex items-center gap-4 p-4">
                  <img
                    src="https://docs.material-tailwind.com/img/logo-ct-dark.png"
                    alt="brand"
                    className="h-8 w-8"
                  />
                  <Typography variant="h5" color="blue-gray">
                    Sidebar
                  </Typography>
                </div> */}
              <div className="p-2">
                <Input
                  icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                  label="Search"
                />
              </div>
              <List>
                <Accordion
                  open={open === 1}
                  icon={
                    <ChevronDownIcon
                      strokeWidth={2.5}
                      className={`mx-auto h-4 w-4 transition-transform ${
                        open === 1 ? "rotate-180" : ""
                      }`}
                    />
                  }
                >
                  <Link to="/home" >
                    <ListItem className="p-0" selected={open === 1}>
                      <AccordionHeader
                        onClick={() => handleOpen(1)}
                        className="border-b-0 p-3"
                      >
                        <ListItemPrefix>
                          <PresentationChartBarIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        <Typography
                          color="blue-gray"
                          className="mr-auto font-normal"
                        >
                          Projects
                        </Typography>
                      </AccordionHeader>
                    </ListItem>
                  </Link>
                  <AccordionBody className="py-1">
                    <List className="p-0">
                      <Link to="/create-project">
                        <ListItem>
                          <ListItemPrefix>
                            <ChevronRightIcon
                              strokeWidth={3}
                              className="h-3 w-5"
                            />
                          </ListItemPrefix>
                          Create Project
                        </ListItem>
                      </Link>

                      <Link to="/show-project">
                        <ListItem>
                          <ListItemPrefix>
                            <ChevronRightIcon
                              strokeWidth={3}
                              className="h-3 w-5"
                            />
                          </ListItemPrefix>
                          Show Projects
                        </ListItem>
                      </Link>
                    </List>
                  </AccordionBody>
                </Accordion>
                <Accordion
                  open={open === 2}
                  icon={
                    <ChevronDownIcon
                      strokeWidth={2.5}
                      className={`mx-auto h-4 w-4 transition-transform ${
                        open === 2 ? "rotate-180" : ""
                      }`}
                    />
                  }
                >
                  <ListItem className="p-0 " selected={open === 2}>
                    <AccordionHeader
                      onClick={() => handleOpen(2)}
                      className="border-b-0 p-3"
                    >
                      <ListItemPrefix>
                        {/* <ShoppingBagIcon className="h-5 w-5" /> */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-6 h-6"
                        >
                          <path d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.01.75.75 0 0 0 .42-.643 4.875 4.875 0 0 0-6.957-4.611 8.586 8.586 0 0 1 1.71 5.157v.003Z" />
                        </svg>
                      </ListItemPrefix>
                      <Typography
                        color="blue-gray"
                        className="mr-auto font-normal"
                      >
                        Manage Members
                      </Typography>
                    </AccordionHeader>
                  </ListItem>
                  <AccordionBody className="py-1">
                    <List className="p-0">
                      <Link to="/add-member">
                        <ListItem>
                          <ListItemPrefix>
                            <ChevronRightIcon
                              strokeWidth={3}
                              className="h-3 w-5"
                            />
                          </ListItemPrefix>
                          Add Member
                        </ListItem>
                      </Link>

                      <Link to="/show-member">
                        <ListItem>
                          <ListItemPrefix>
                            <ChevronRightIcon
                              strokeWidth={3}
                              className="h-3 w-5"
                            />
                          </ListItemPrefix>
                          View Members
                        </ListItem>
                      </Link>
                    </List>
                  </AccordionBody>
                </Accordion>
                <hr className="my-2 border-blue-gray-50" />
                </List>
                
                <List className="absolute bottom-4  ">
                  <ListItem>
                    <ListItemPrefix>
                      <InboxIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Inbox
                    <ListItemSuffix>
                      <Chip
                        value="14"
                        size="sm"
                        variant="ghost"
                        color="blue-gray"
                        className="rounded-full"
                      />
                    </ListItemSuffix>
                  </ListItem>
                  <Link to='/profile'>

                    <ListItem>
                      <ListItemPrefix>
                        <UserCircleIcon className="h-5 w-5" />
                      </ListItemPrefix>
                      Profile
                    </ListItem>
                  </Link>
                  <ListItem>
                    <ListItemPrefix>
                      <Cog6ToothIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Settings
                  </ListItem>
                  <ListItem onClick={handleSignOut}>
                    <ListItemPrefix>
                      <PowerIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Log Out
                  </ListItem>
               
              </List>
            </Card>
          )}
        </>
      ) : (
        <></>
      )}

      {/* </Drawer> */}
    </>
  );
}