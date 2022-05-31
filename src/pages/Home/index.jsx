import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";

function Home() {
  const [value, setValue] = useState("");
  const [list, setList] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [countPage, setcountPage] = useState(1);
  const [isEdit, setIsEdit] = useState();

  const asstoken = window.localStorage.getItem("asstoken");

  const handleDelete = useCallback((id) => {
    axios
      .delete(
        `http://192.168.1.23:3000/todo/${id}`,

        {
          headers: {
            Authorization: "Bearer " + asstoken, //the token is a variable which holds the token
          },
        }
      )
      .then(function (response) {
        console.log(
          response,
          list.filter((e) => e._id !== id)
        );
        setList(list.filter((e) => e._id !== id));
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handleUpdate = useCallback((value, id) => {
    axios
      .patch(
        "http://192.168.1.23:3000/todo",
        {
          title: value,
          is_finished: false,
          _id: id,
        },
        {
          headers: {
            Authorization: "Bearer " + asstoken, //the token is a variable which holds the token
          },
        }
      )
      .then(function (response) {
        console.log(
          response,
          list.map((e) => {
            if (e._id === id) {
              return { ...e, title: value };
            }
            return e;
          })
        );
        //window.location.reload();
        setList(
          list.map((e) => {
            if (e._id === id) {
              return { ...e, title: value };
            }
            return e;
          })
        );
      })

      .catch(function (error) {
        console.log(error);
      })
      .finally(() => setIsEdit());
  }, []);
  const handleClick = useCallback((value) => {
    axios
      .post(
        "http://192.168.1.23:3000/todo",
        {
          title: value,
          is_finished: false,
        },
        {
          headers: {
            Authorization: "Bearer " + asstoken, //the token is a variable which holds the token
          },
        }
      )
      .then(function (response) {
        console.log(response, [{ ...response.data.data }, ...list]);
        window.location.reload();
        // setList([{ ...response.data.data }, ...list]);
      })

      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://192.168.1.23:3000/todo?page=${countPage}`, {
        headers: {
          Authorization: "Bearer " + asstoken, //the token is a variable which holds the token
        },
      })
      .then(function (response) {
        if (response.data) {
          console.log(response.data.data);
          setList(response.data.data);
          setTotalPages(Math.ceil(response.data.count / 10));
        }
      })

      .catch(function (error) {
        console.log(error);
      });
  }, [countPage]);

  console.log(totalPages);

  return (
    <div className="min-h-screen  p-8 sm:p-16 bg-gray-800 text-black">
      <div className="m-auto max-w-md w-full overflow-hidden">
        <h1 className="uppercase text-2xl block font-bold py-6 text-gray-400 tracking-widest text-center">
          My To Do List
        </h1>
        <div className="flex">
          <input
            className=" w-500 border flex items-center justify-between relative mb-10"
            type="text"
            onChange={(e) => setValue(e.target.value)}
          />
          <button
            className="text-green-400 hover:text-green-300 bg-gray-900 font-semibold py-2 px-4 absolute right-0 mr-400 focus:outline-none ml"
            onClick={() => handleClick(value)}
          >
            Add
          </button>
        </div>
        <ul>
          {list.map((item) => (
            <li key={item._id}>
              {item._id !== isEdit && (
                <div
                  className=" flex list-none  mr-3 text-red-500 focus:outline-none hover:underline"
                  onDoubleClick={() => setIsEdit(item._id)}
                >
                  <div className="w-500 break-all">{item.title}</div>
                  <div className="ml-40">
                    <button onClick={() => handleDelete(item._id)}>
                      Clear
                    </button>
                  </div>
                </div>
              )}
              {!!isEdit && item._id === isEdit && (
                <div>
                  <input
                    className="input"
                    type="text"
                    onChange={(e) => setValue(e.target.value)}
                    defaultValue={item.title}
                  />
                  <button
                    className="button"
                    onClick={() => handleUpdate(value, item._id)}
                  >
                    Update
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
        <div className="flex ">
          {totalPages > 1 &&
            Array(totalPages)
              .fill()
              .map((_, idx) => 1 + idx)
              .map((item) => (
                <div className="" key={item}>
                  <div onClick={() => setcountPage(item)}>{item}</div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
