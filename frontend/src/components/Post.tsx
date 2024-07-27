import Card from "react-bootstrap/Card";
import CardBody from "react-bootstrap/CardBody";
import CardTitle from "react-bootstrap/CardTitle";
import Image from "react-bootstrap/Image";
import ***REMOVED*** CardSubtitle ***REMOVED*** from "react-bootstrap";
import ***REMOVED*** CSSProperties ***REMOVED*** from "react";
import ***REMOVED*** Post as PostInterface ***REMOVED*** from "../types";

/**
 * Renders a single post within the application, displaying the post's content along with the author's information.
 *
 * This component utilizes the `Card` component from React Bootstrap to present the post in a styled card format,
 * enhancing the visual presentation. The card includes the author's avatar, name, and the post's title and content.
 *
 * The layout is designed with CSSProperties to ensure a consistent and responsive design across different devices.
 * The styles are defined for the card, header, image, and text elements to align with the application's design language.
 *
 * @component
 * @param ***REMOVED***Object***REMOVED*** props - The properties passed to the Post component.
 * @param ***REMOVED***PostInterface***REMOVED*** props.post - The post data to be displayed, conforming to the PostInterface structure.
 */
const Post = (***REMOVED*** post ***REMOVED***: ***REMOVED*** post: PostInterface ***REMOVED***) => ***REMOVED***
  const cardStyle: CSSProperties = ***REMOVED***
    background: "#F5F5F5",
    width: "80%",
    padding: "1%",
    margin: "auto",
    marginTop: "1%",
  ***REMOVED***;

  const headerStyle: CSSProperties = ***REMOVED***
    display: "flex",
    flexDirection: "row",
  ***REMOVED***;

  const imageStyle: CSSProperties = ***REMOVED***
    background: "white",
    borderRadius: "50%",
    width: 40,
    height: 40,
    display: "block",
  ***REMOVED***;

  const textStyle: CSSProperties = ***REMOVED***
    display: "flex",
    flexDirection: "column",
    paddingLeft: "2%",
  ***REMOVED***;

  const titleStyle: CSSProperties = ***REMOVED***
    fontSize: "medium",
  ***REMOVED***;

  const subtitleStyle: CSSProperties = ***REMOVED***
    color: "GrayText",
    fontSize: "small",
  ***REMOVED***;

  return (
    <Card className='text-dark' style=***REMOVED***cardStyle***REMOVED***>
      <CardBody className='text-dark' style=***REMOVED***headerStyle***REMOVED***>
        <Image
          className='border'
          src=***REMOVED***post.user.photo ? post.user.photo : import.meta.env.VITE_LOGO_PATH***REMOVED***
          style=***REMOVED***imageStyle***REMOVED***
        />
        <div style=***REMOVED***textStyle***REMOVED***>
          <CardTitle style=***REMOVED***titleStyle***REMOVED***>***REMOVED***post.user.email***REMOVED***</CardTitle>
          <CardSubtitle style=***REMOVED***subtitleStyle***REMOVED***>@***REMOVED***post.user.username***REMOVED***</CardSubtitle>
        </div>
      </CardBody>
      <CardBody>***REMOVED***post.content***REMOVED***</CardBody>
    </Card>
  );
***REMOVED***;

export default Post;
