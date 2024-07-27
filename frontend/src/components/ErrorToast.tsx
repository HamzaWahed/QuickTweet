import ***REMOVED*** Dispatch, SetStateAction ***REMOVED*** from "react";
import ***REMOVED*** Toast, ToastContainer ***REMOVED*** from "react-bootstrap";

/**
 * Displays a toast notification for errors. It is a controlled component that requires `show` and `setShow` props to control its visibility.
 *
 * @component
 * @param ***REMOVED***Object***REMOVED*** props - The component props.
 * @param ***REMOVED***string***REMOVED*** props.title - The title of the error toast.
 * @param ***REMOVED***string***REMOVED*** props.msg - The message to be displayed in the toast.
 * @param ***REMOVED***boolean***REMOVED*** props.show - Controls the visibility of the toast. When `true`, the toast is shown.
 * @param ***REMOVED***Dispatch<SetStateAction<boolean>>***REMOVED*** props.setShow - A function to update the `show` state, typically to hide the toast.
 * @returns ***REMOVED***React.ReactElement***REMOVED*** A ToastContainer component containing a Toast component.
 */
const ErrorToast = (***REMOVED***
  title,
  msg,
  show,
  setShow,
***REMOVED***: ***REMOVED***
  title: string;
  msg: string;
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
***REMOVED***): React.ReactElement => ***REMOVED***
  return (
    <ToastContainer position='top-end' className='p-3' style=***REMOVED******REMOVED*** zIndex: 1 ***REMOVED******REMOVED***>
      <Toast autohide=***REMOVED***true***REMOVED*** onClose=***REMOVED***() => setShow(false)***REMOVED*** show=***REMOVED***show***REMOVED***>
        <Toast.Header>
          <strong className='me-auto'>***REMOVED***title***REMOVED***</strong>
        </Toast.Header>
        <Toast.Body>***REMOVED***msg***REMOVED***</Toast.Body>
      </Toast>
    </ToastContainer>
  );
***REMOVED***;

export default ErrorToast;
