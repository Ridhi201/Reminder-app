import {
  MdVisibility,
  MdEdit,
  MdDelete,
} from "react-icons/md";

export default function TableActions() {

  return (

    <td>

      <MdVisibility
        style={{cursor:"pointer",marginRight:10}}
      />

      <MdEdit
        style={{cursor:"pointer",marginRight:10}}
      />

      <MdDelete
        style={{cursor:"pointer"}}
      />

    </td>

  );

}
