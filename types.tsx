export type RootStackParamList = {
	Home: undefined;
	Welcome: undefined;
	Login: undefined;
	Register: undefined;
};

export type MomentStackParamList = {
	Feed: undefined;
	Search: undefined;
	PostImageScreen: { imageBase64: string[] };
	PostDetailScreen: {};
};

export type ProfileStackParamList = {
	Notification: undefined;
	Main: undefined;
	Setting: undefined;
	Edit: undefined;
	FocusUsers: undefined;
	FansUsers: undefined;
};

export type RecordStackParamList = {
	Diet: undefined;
	DietRecord: { date: string; type: string };
	History: undefined;
	Sports: undefined;
	SportsRecord: undefined;
	HealthFrontPageScreen: undefined;
	LogHealthInfoScreen: undefined;
};
