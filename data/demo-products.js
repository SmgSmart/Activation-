const P=(id,name,category,price,duration,compat,avail,feat,desc)=>({id,name,category,price,currency:'GHS',duration,compat,available:avail,featured:feat,description:desc+' (Demo listing)',activation:'Open your account area after the demo purchase and follow the steps shown on the activation record.',delivery:'Digital - demo activation reference',added:id});
export const PRODUCTS=[
P(1,'FlashBridge Toolkit','Unlock Software',120,'30 days','Windows 10/11',true,true,'Device service toolkit with guided workflows.'),
P(2,'PortLink Mobile Suite','Mobile Device Utilities',85,'90 days','Windows, macOS',true,true,'Backup, transfer and diagnostics for phones.'),
P(3,'OfficeDesk Licence','Windows Software',210,'1 year','Windows 10/11',true,false,'Productivity suite licence listing.'),
P(4,'CodeForge Studio','Developer Tools',160,'1 year','Windows, macOS, Linux',true,true,'Lightweight IDE with debugging tools.'),
P(5,'SecureVault Activation','Software Activations',60,'6 months','Windows 10/11',false,false,'Password and file vault activation.'),
P(6,'PhotoLab Express','Digital Applications',95,'Lifetime','Windows, macOS',true,false,'Photo editing application.'),
P(7,'UnlockDesk Pro','Unlock Software',250,'1 year','Windows 10/11',true,true,'Professional multi-device service console.'),
P(8,'APIScope Debugger','Developer Tools',75,'3 months','Any browser',true,false,'Inspect and replay API requests.')];
