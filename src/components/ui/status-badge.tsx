import { Badge } from "@/layouts/badge";
import { Text } from "@/components/ui/text";

export function renderOptionDisplayValue(value: string) {
  switch (value.toLowerCase()) {
    case "medium":
      return (
        <div className="flex items-center">
          <Badge
            color="warning"
            renderAsDot
            className="bg-yellow-600 h-2 w-2"
          />
          <Text className="ms-2 font-medium text-yellow-600">{value}</Text>
        </div>
      );
    case "low":
      return (
        <div className="flex items-center">
          <Badge color="info" renderAsDot className="bg-blue-600 h-2 w-2" />
          <Text className="ms-2 font-medium text-blue-600">{value}</Text>
        </div>
      );
    case "high":
      return (
        <div className="flex items-center">
          <Badge color="danger" renderAsDot className="bg-orange-400 h-2 w-2" />
          <Text className="ms-2 font-medium text-orange-400">{value}</Text>
        </div>
      );
    case "critical":
      return (
        <div className="flex items-center">
          <Badge color="danger" renderAsDot className="bg-red-600 h-2 w-2" />
          <Text className="ms-2 font-medium text-red-600">{value}</Text>
        </div>
      );
    case "completed":
      return (
        <div className="flex items-center">
          <Badge color="danger" renderAsDot className="bg-green-600 h-2 w-2" />
          <Text className="ms-2 font-medium text-green-600">{value}</Text>
        </div>
      );
    case "running":
      return (
        <div className="flex items-center">
          <Badge color="danger" renderAsDot className="bg-blue-600 h-2 w-2" />
          <Text className="ms-2 font-medium text-blue-600">{value}</Text>
        </div>
      );
    case "started":
      return (
        <div className="flex items-center">
          <Badge
            color="danger"
            renderAsDot
            className="bg-primary-600 h-2 w-2"
          />
          <Text className="ms-2 font-medium text-primary-600">{value}</Text>
        </div>
      );
    case "hold":
      return (
        <div className="flex items-center">
          <Badge
            color="warning"
            renderAsDot
            className="bg-yellow-600 h-2 w-2"
          />
          <Text className="ms-2 font-medium text-yellow-600">{value}</Text>
        </div>
      );
      case "inprogress":
        return (
          <div className="flex items-center">
            <Badge
              color="danger"
              renderAsDot
              className="bg-primary-600 h-2 w-2"
            />
            <Text className="ms-2 font-medium text-primary-600">{value}</Text>
          </div>
        );
    case "in progress":
      return (
        <div className="flex items-center">
          <Badge
            color="danger"
            renderAsDot
            className="bg-primary-600 h-2 w-2"
          />
          <Text className="ms-2 font-medium text-primary-600">{value}</Text>
        </div>
      );
    case "rejected":
      return (
        <div className="flex items-center">
          <Badge color="danger" renderAsDot className="bg-red-600 h-2 w-2" />
          <Text className="ms-2 font-medium text-red-600">{value}</Text>
        </div>
      );
    case "selected":
      return (
        <div className="flex items-center">
          <Badge color="danger" renderAsDot className="bg-green-600 h-2 w-2" />
          <Text className="ms-2 font-medium text-green-600">{value}</Text>
        </div>
      );

    default:
      return (
        <div className="flex items-center">
          <Badge renderAsDot className="bg-gray-400" />
          <Text className="ms-2 font-normal capitalize text-gray-600">
            {value}
          </Text>
        </div>
      );
  }
}

const StatusBadge = ({ status }: any) => {
  switch (status.toLowerCase()) {
    case "critical":
      return (
        <Badge color="danger" className="bg-red-100">
          <div className="flex items-center cursor-pointer">
            <Badge color="danger" renderAsDot className="bg-red-600 h-2 w-2" />
            <Text className="ms-2 font-medium text-red-600">{status}</Text>
          </div>
        </Badge>
      );
    case "high":
      return (
        <Badge color="danger" className="bg-orange-100">
          <div className="flex items-center cursor-pointer">
            <Badge
              color="danger"
              renderAsDot
              className="bg-orange-400 h-2 w-2"
            />
            <Text className="ms-2 font-medium text-orange-400">{status}</Text>
          </div>
        </Badge>
      );
    case "medium":
      return (
        <Badge color="danger" className="bg-yellow-100">
          <div className="flex items-center cursor-pointer">
            <Badge
              color="warning"
              renderAsDot
              className="bg-yellow-600 h-2 w-2"
            />
            <Text className="ms-2 font-medium text-yellow-600">{status}</Text>
          </div>
        </Badge>
      );
    case "low":
      return (
        <Badge color="danger" className="bg-blue-100">
          <div className="flex items-center cursor-pointer">
            <Badge color="info" renderAsDot className="bg-blue-600 h-2 w-2" />
            <Text className="ms-2 font-medium text-blue-600">{status}</Text>
          </div>
        </Badge>
      );
    default:
      return (
        <div className="flex items-center cursor-pointer">
          <Badge renderAsDot className="bg-gray-400" />
          <Text className="ms-2 font-medium text-gray-600">{status}</Text>
        </div>
      );
  }
};

export default StatusBadge;
