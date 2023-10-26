import moment from "moment";

export function dateTransform(date: string) {
    const diff = moment().diff(new Date(date), 'minutes');
  
    if (Math.floor(diff / 1440) > 1) {
      return `${Math.floor(diff / 1440)} days ago`;
    } else if (Math.floor(diff / 60) > 1) {
      return `${Math.floor(diff / 60)} hours ago`;
    } else {
      return `${Math.floor(diff)} minutes ago`;
    }
  }