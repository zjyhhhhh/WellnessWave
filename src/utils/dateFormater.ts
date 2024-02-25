export const formatDateToShortMonthDay = (dateString: string) => {
	const [year, month, day] = dateString.split("-");
	const date = new Date(+year, +month - 1, +day);
	const formattedDate = date.toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
	});

	return formattedDate;
}

export const formatDateToRelativeDay = (dateString: string) => {
	const [year, month, day] = dateString.split("-");
	const date = new Date(+year, +month - 1, +day);
	const today = new Date();
  const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const yesterday = new Date(todayDate);
	yesterday.setDate(yesterday.getDate() - 1);

	if (date.getTime() === todayDate.getTime()) {
		return "Today";
	} else if (date.getTime() === yesterday.getTime()) {
		return "Yesterday";
	}

	return formatDateToShortMonthDay(dateString);
}

export const generateDateRange = (startDate: Date, endDate: Date) => {
	const dates = [];
	let currentDate = new Date(startDate);

	while (currentDate <= endDate) {
		dates.push(currentDate.toISOString().split("T")[0]);
		currentDate.setDate(currentDate.getDate() + 1);
	}

	return dates;
}