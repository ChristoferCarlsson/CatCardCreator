import { useMutation, useQuery, useQueryClient } from "react-query";
import { Inter } from "next/font/google";
import { UserData } from "@/types/global";
import styles from "@/styles/Home.module.css";
const inter = Inter({ subsets: ["latin"] });

const CatCardCreator = (props:any) => {

    const { mutate} = useMutation(
      (post:any) =>
        fetch(`${props.link}/users/${props.owner}`, {
          method: "PUT",
          body: JSON.stringify(post),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        }),
      {
        onSuccess: async (data) => {
          alert("Cat has been added");
        },
      }
    );

const endpoint = `https://api.thecatapi.com/v1/images/search`;
const { isLoading, error, data } = useQuery(
  ["userData", "https://api.thecatapi.com/v1/images/search"],
  (): Promise<UserData> => fetch(endpoint).then((res) => res.json())
);

if (isLoading) return <div>"Loading..."</div>;

if (error && error instanceof Error)
  return <div>{"An error has occurred: " + error.message}</div>;

if (!data) return <div>No data</div>;

let randomCat:any = data;

const pushNewCat = (event:any) => {
  let picture:any = document.getElementById("catPicture") as HTMLElement;
  let name:any = document.getElementById("catName") as HTMLElement;
  picture = picture.src;
  name = name.value;

  let data = props.data;
  let newCat = {
    "nickname": name,
    "imageID": picture + " " + name,
    "imageURI": picture,
    "breed": "Unknown",
    "breedId": "Unknown",
    "width": 1000,
    "height": 1000
  }

  data.herd.push(newCat);
  mutate(data);

  props.update();
}

  return (
    <>
      <div className={styles.catCreator}>
        <label>Name your cat</label>
        <input id="catName" type="text" />
        <img id="catPicture" className={styles.cardCreatorImage} src={randomCat[0].url} alt="" />
        <button
          onClick={() =>
            pushNewCat(event)
          }
        >
          Add Cat
        </button>
      </div>
    </>
  )
};
export default CatCardCreator;
