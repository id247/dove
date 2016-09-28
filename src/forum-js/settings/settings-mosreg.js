export const OAuthOptions = {
	provider: 'doveMosreg',
	authUrl: 'https://login.school.mosreg.ru/oauth2',
	grantUrl: 'https://api.school.mosreg.ru/v1/authorizations',
	scope: 'Avatar,FullName,Birthday,Age,Roles,Files,Sex',	
	clientId: '742c87fd7a484e31b22088ca3d6342a5',
	redirectUrl: 'https://ad.school.mosreg.ru/promo/oauth2',
}

export const APIoptions = {	
	base: 'https://api.school.mosreg.ru/v1/',
}

export const PromoOptions = {	
	url: 'https://ad.school.mosreg.ru/promo/dove-girls',
	server: 'https://school.mosreg.ru',
}

export const ForumOptions = {	
	pageSize: 15,
	psyhoId: [
		//'1000005196516',
	],
	anonAvatar: 'https://static.school.mosreg.ru/images/avatars/user/a.m.jpg',
	postsLabel: {
		mothers: 'forum-mothers',
		girls: 'forum-girls',
		competition: 'competition-mothers',
	},
}
