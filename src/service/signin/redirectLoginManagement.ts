import Cookies from "js-cookie";

export const redirectLoginManagement = () => {
  const role = Cookies.get("userRole"); // ambil langsung role

  if (!role) {
    window.location.href = "/404";
    return;
  }

  switch (role) {
    case "desa":
      window.location.href = "/desa/dashboard";
      break;
    case "petugas":
      window.location.href = "/petugas/dashboard";
      break;
    case "stakeholder":
      window.location.href = "/gov/dashboard";
      break;
    default:
      window.location.href = "/404";
  }
};
