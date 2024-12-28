import { FunctionComponent, ReactNode, useEffect, useState, useTransition } from "react";
import User from "../interfaces/User";
import MyNavbar from "./MyNavbar";

import InfiniteScroll from 'react-infinite-scroll-component'
import { deleteUser, getAllUsers } from "../services/usersService";
import { data, useNavigate } from "react-router-dom";
import { Spinner, Toast } from "react-bootstrap";
import { ToastRes } from "../services/toastService";
import Sppiner from "./Sppiner";
import { ifError } from "assert";


interface SandboxProps {
  
}

const Sandbox: FunctionComponent<SandboxProps> = () => {
   const [isPending, startTransition] = useTransition();
  let [isLoading, setIsLoading] = useState(true);
  let [redoFlag, setRedoFlag] = useState(true);
  let [hasMore, setHasMore] = useState(true);
  let [dataLength, setDatalength] = useState<User[]>([]);
  let [scrollPage, setScrollPage] = useState<number>(0)
  let [check, setCheck] = useState<number>(0)

    let [users, setUsers] = useState<User[]>([])
    let [usersFlag,setUsersTableFlag] = useState(false)
    let [seach, setSearch] = useState<User[]>([])
    let [seachTXT, setSearchTXT] = useState<string>('')
    function reset() {
        setUsersTableFlag(!usersFlag);
    }
    let navigator = useNavigate();
    useEffect(() =>{
        getAllUsers().then((res) => {
         
          setUsers(res.data);
          setIsLoading(false);
          
        })
    }, [usersFlag])

    function findUserByDetails() {
   

      if (seachTXT != "") {
        let finds = users.filter((user) => {
          return (
            user.email.includes(seachTXT) ||
            user.name.first.includes(seachTXT) ||
            user.name.last.includes(seachTXT)
          );
        });
        
        setDatalength(finds);
        setHasMore(false);
        
      } else {
        
        setDatalength([])
        setHasMore(true)
          setScrollPage(0);
          setRedoFlag(!redoFlag)
          
        }
      }
  
  function nextP() {
    startTransition(() => {
     if (dataLength.length <= users.length) {
       let addToArray: User[] = [];
       for (
         let i = scrollPage * 50;
         i < 50 * scrollPage + 50 && i < users.length;
         i++
       ) {
         addToArray.push(users[i]);
         setCheck(i);
       }

       setScrollPage((prev) => prev + 1);
       
       setDatalength([...dataLength, ...addToArray]);
       if (dataLength.length >= users.length) {
         setHasMore(false);
       }
     }
  })
   
  }
  useEffect(() => {
    if (users.length && isLoading == false) {
      nextP()
    }
  },[users,redoFlag])

    return (
      <>
        <MyNavbar allCards={[]} isHome={false} />
        {!isLoading ? (
          <>
            <button
              className=" btn btn-outline-success d-block  m-0 m-auto mb-1 mt-2 "
              onClick={(e: any) => {
                findUserByDetails();
              }}
            >
              SEARCH USER
            </button>
            <input
              id="search-user"
              type="text"
              className="form-control w-25 m-0 m-auto d-block mb-2"
              onChange={(e: any) => {
                setSearchTXT(e.target.value);
              }}
            />

            <div className="container d-block w-100 m-0 m-auto">
                  <InfiniteScroll
                    dataLength={dataLength.length}
                    next={nextP}
                    hasMore={hasMore}
                loader={<div>
                  Loading...
              </div>
                  }
                endMessage={<p>end</p>}
                  >
              <table className="table  table-bordered w-100 ">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">User Id</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">User type</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                    <tbody>
                    {dataLength.map((user, index) => {
                      return (
                        <tr
                          key={user._id || index}
                          className={user.isAdmin || false ? "bg-warning" : ""}
                        >
                          <th scope="row">{index + 1}</th>
                          <td>{user._id || "N/A"}</td>
                          <td>{user.name?.first || "N/A"}</td>
                          <td>{user.name?.last || "N/A"}</td>
                          <td>{user.email || "N/A"}</td>
                          <td>
                            {user.isAdmin ||false
                              ? "(A) Admin"
                              : user.isBusiness
                              ? "(B) Business"
                              : "(C) Customer"}
                          </td>
                          <td>
                            <button
                              className="btn btn-info"
                              onClick={() =>
                                navigator(`/update-user/${user._id}`)
                              }
                              >
                              Edit
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-danger"
                              onClick={() => {
                                deleteUser(user._id as string)
                                .then(() => {
                                    ToastRes(
                                      "success",
                                      "User deleted permanently!",
                                      "light",
                                      2000
                                    );
                                  reset();
                                  setRedoFlag(!redoFlag)
                                  })
                                  .catch((error) => {
                                    ToastRes(
                                      "error",
                                      "Failed to delete user. Please try again.",
                                      "light",
                                      2000
                                    );
                                  });
                              }}
                              >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
                    </InfiniteScroll>
            </div>
          </>
        ) : (
          <Sppiner></Sppiner>
        )}
      </>
    );}
        export default Sandbox;

 