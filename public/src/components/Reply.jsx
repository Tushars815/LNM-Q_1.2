import React, { useEffect,useState } from 'react'
import { allPostsRoute , deletePostRoute, deleteReplyRoute} from '../utils/APIRoutes'
import { useNavigate, Link} from "react-router-dom";
import axios from 'axios'
import Logout from './Logout';
import "../css/reply.css";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ReplyDialog } from "../components/Dialog";

export default function Reply({ postId }) {
    const navigate = useNavigate();
    const [post, setpost] = useState(null);
    const [currUserId, setCurrUserId] = useState(null);
    const [currUsername, setCurrUsername] = useState(null);
    const [isliked, setisliked] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(()=>{
      const GetPost= async ()=>{
        try {
          const {data} = await axios.get(`${allPostsRoute}/${postId}`);
          setpost(data.post);
        } catch (error) {
          console.log(error);
        }
      }
      GetPost();
      if (localStorage.getItem("USER")) {
        const username = JSON.parse(
        localStorage.getItem("USER")
      ).username;
      const userId= JSON.parse(localStorage.getItem("USER"))._id;
      setCurrUserId(userId);
      setCurrUsername(username);
      }
  },[])

      const handledeletepost =async ()=>{
        const data =await axios.post(deletePostRoute,{
          postId
        })
        if (data.status === false) {
          alert(data.msg);
        }
        if (data.status === true) {
          alert(data.msg);
        }
        navigate("/posts");
      };

      const handledeletereply = async (replyId)=>{
        const {data} =await axios.post(deleteReplyRoute,{
          postId,
          replyId
        })
        if (data.status === false) {
          alert(data.msg);
        }
        if (data.status === true) {
          alert(data.msg);
        }
        setpost(data.post);
      }

     const handleLike = async (postId) => {
        try {
            const { data } = await axios.post(`${allPostsRoute}/${postId}`, {
                userId: currUserId
            });
            const updatedPost = { ...post, likes: data.likes };
            setpost(updatedPost);
            setisliked(!isliked);
        } catch (error) {
            console.error(error);
        }
        
    };

    const handleUsernameClick = (userId) => {
      navigate("/profile", { state: { userId: userId } });
    }; 
   
    return (
      <div className="App">
        <div className="bg-white">
          <header className="sticky inset-x-0 top-0 z-50">
            <nav
              className="flex items-center justify-between p-6 lg:px-8"
              aria-label="Global"
            >
              <div className="flex lg:flex-1 lg:gap-x-12">
                <button href="#" className="-m-1.5 p-1.5">
                  <span className="sr-only">LNM-Q</span>
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt=""
                  />
                </button>
              </div>
              <div className="flex lg:hidden">
                <button
                  type="button"
                  className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                  onClick={() => setMobileMenuOpen(true)}
                >
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-12">
                <Link to="/posts"><button>Home</button></Link>
                <button
                  className="text-sm font-semibold leading-6 text-gray-900 "
                  onClick={() => handleUsernameClick(currUserId)}
                >
                  My Profile
                </button>
                <button
                  href="#"
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  <Logout />
                </button>
              </div>
            </nav>
            <Dialog
              as="div"
              className="lg:hidden"
              open={mobileMenuOpen}
              onClose={setMobileMenuOpen}
            >
              <div className="fixed inset-0 z-50" />
              <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                <div className="flex items-center justify-between">
                  <button href="#" className="-m-1.5 p-1.5">
                    <span className="sr-only">LNM-Q</span>
                    <img
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                      alt=""
                    />
                  </button>
                  <button
                    type="button"
                    className="-m-2.5 rounded-md p-2.5 text-gray-700"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-6 flow-root">
                  <div className="-my-6 divide-y divide-gray-500/10">
                    <Link to="/posts"><button>Home</button></Link>
                    <div className="space-y-2 py-6">
                      <button
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      >
                        My Profile
                      </button>
                    </div>
                    <div className="py-6">
                      <button
                        href="#"
                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      >
                        <Logout />
                      </button>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Dialog>
          </header>
        </div>
        <div className="post-section">
          {post && (
            <>
              <div className="relative isolate px-6 pt-14 lg:px-8 ">
                <div
                  className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                  aria-hidden="true"
                >
                  <div
                    className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                    style={{
                      clipPath:
                        "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                    }}
                  />
                </div>
                <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 z-100 ">
                  <div className="text-center">
                    <p>Post: </p>
  
                    <p className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                      {post.topic}
                    </p>
                    <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                      {post.username}
                    </p>
  
                    <p className="text-md font-semibold leading-6">{post.text}</p>
                    {post.likes.indexOf(currUserId)=== -1 ? (
                      <>
                        <button onClick={()=> handleLike(post._id)}>Likes: </button>
                        <p className="inline"> {post.likes.length}</p>
                      </>
                        
                    ):(
                      <>
                        <button className="bg-red-500 " onClick={()=> handleLike(post._id)}>Likes: </button>
                        <p className="inline"> {post.likes.length}</p>
                      </>
                    )}
                    <p>{new Date(post.createdAt).toLocaleString()}</p>
  
                    {currUserId === post.userId && (
                      <>
                        <button
                          className="inline-block  bg-red-500 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2"
                          onClick={() => handledeletepost()}
                        >
                          Delete
                        </button>
                        <br />
                      </>
                    )}
                    <div>
                      <ReplyDialog
                        postId={postId}
                        setpost={setpost}
                        currUserId={currUserId}
                        currUsername={currUsername}
                      />
                    </div>
                  </div>
                </div>
  
                <br />
                <p>Replies:</p>
                <div className="snap-container">
                  <ul>
                    {post.replies &&
                      post.replies.map((reply) => (
                        <div className="snap-child-s sm:snap-child-l bg-image">
                          <div className="px-6 py-4">
                            <li key={reply._id}>
                              <div
                                className="font-bold text-xl mb-2"
                                onClick={() => handleUsernameClick(reply.userId)}
                              >
                                Username: {reply.username}
                              </div>
                              <p>{reply.text}</p>
                              <p>{new Date(reply.createdAt).toLocaleString()}</p>
                              {console.log(reply)}
                              {currUserId === reply.userId && (
                                <>
                                  <button
                                    onClick={() => handledeletereply(reply._id)}
                                    className="inline-block  bg-red-500 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2"
                                  >
                                    Delete
                                  </button>
                                  <br />
                                </>
                              )}
                              <br />
                            </li>
                          </div>
                        </div>
                      ))}
                  </ul>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }