import { FontAwesome } from "@expo/vector-icons";

function Icon(props: {
    name: React.ComponentProps<typeof FontAwesome>['name'];
    color: string;
  }) {
    return <FontAwesome size={15} style={{ }} {...props} />;
  }