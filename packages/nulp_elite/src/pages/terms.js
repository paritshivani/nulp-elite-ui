import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Footer from "components/Footer";
import Header from "components/header";
import { Container } from "@mui/material";
import Box from '@mui/material/Box';
const Terms = () => {
  const { t } = useTranslation();

  return (
<div>
    <Header/>
    <Container>
    <Box sx={{fontSize:'18px',color:'#484848',paddingBottom:'10px'}}>{t('TERMS_CONDITIONS')}</Box>

    <p><em>(Last updated on&nbsp;</em><em><strong>19-05-2022</strong></em><em>)</em></p>
    <p>This website is designed, developed, and maintained by the National Institute of Urban Affairs (NIUA) (Ministry of Housing &amp; Urban Affairs, Government of India) (together referred to as&nbsp;<strong>"GoI"</strong>).</p>
    <p>These terms of use, as amended, govern the usage of NULP (National Urban Learning Platform) by its Users (as defined below) (<strong>"Terms"</strong>). NULP is an initiative of the GoI.</p>
    <p>By using NULP, you have accepted and agree to be governed by these Terms, as may be amended from time to time. The terms "you", "your" hereinafter refer to any User of NULP, including Registered Users (as defined below).</p>
    <ol>
        <li>
            <p><strong>Definitions</strong></p>
            <ol type="a">
                <li>
                    <p><strong>Administrator</strong> means any natural person who is a Registered User and who is authorized to be an administrator by an Institutional User on behalf of such Institutional User.&nbsp;</p>
                </li>
                <li>
                    <p><strong>Content</strong> means and includes, as the context requires, (i) any text, scripts, graphics, photos, sounds, music, videos, audio-visual combinations, interactive content, features and other materials you may view, access or contribute, (ii) all content and postings that are written, uploaded, submitted, stored, sent, received, shared or otherwise provided by Registered Users, such as posts, comments, feedback, submissions, responses, explanation in forums or groups, for teaching and learning materials, and/or using project/ survey/ observation tools, and (iii) all types of learning material created, uploaded or consumed by a User, such as resources, collections (i.e. sets of ordered resources bundled together to be consumed as a whole).</p>
                </li>
                <li>
                    <p><strong>NULP</strong> means National Urban Learning Platform which&nbsp;supplements traditional capacity building with online learning to enhance skills of urban practitioners in an ever-changing ecosystem. It is accessible online at https://https://nulp.niua.org/.</p>
                </li>
                <li>
                    <p><strong>Institutional User</strong> means and includes MoHUA, National Institute of Urban Affairs, any Urban Local Body or State or organizations who are authorized to operate as a tenant on the NULP.</p>
                </li>
                <li>
                    <p><strong>Registered Users</strong> are (i) Users of NULP, who register themselves as users of NULP in accordance with the requirements specified on NULP, and (ii) Users of NULP who have been registered on NULP by an Administrator with permissions to create, curate, review or publish Content for NULP, and such users can log in to NULP with their registered credentials.</p>
                </li>
                <li>
                    <p><strong>Users</strong> are all-natural persons who access NULP, view or use Content on NULP, and such Users include Registered Users of NULP.</p>
                </li>
            </ol>
        </li>
        <li>
            <p><strong>Access and Use</strong></p>
            <ol type="a">
                <li>
                    <p><strong>Users</strong></p>
                    <ol type="I">
                        <li>
                            <p>As a User you represent and warrant that you are legally competent to form a binding contract.</p>
                        </li>
                        <li>
                            <p>If you are agreeing to these Terms on behalf of a department, institution, organization, or other legal entity you hereby represent and warrant that you are duly authorized to agree to these Terms on behalf of that department, institution, organization or entity and these Terms are binding on them.</p>
                        </li>
                        <li>
                            <p>If you are agreeing to these Terms on behalf of a learner hereby represent and warrant that your consent, to access, view and use Content on NULP in accordance with these Terms.</p>
                        </li>
                        <li>
                            <p>If you are a learner, you are accessing NULP to view and use Content on NULP by registering yourself on NULP.</p>
                        </li>
                        <li>
                            <p>Users can:</p>
                            <ol type="I">
                                <li>
                                    <p>access and use Content available on NULP,</p>
                                </li>
                                <li>
                                    <p>create and manage their User profiles, and</p>
                                </li>
                                <li>
                                    <p>share Content with other Users.</p>
                                </li>
                            </ol>
                        </li>
                        <li>
                            <p>NULP should be used for learning purposes. As a User, you will be responsible for all your actions and activities in relation to your usage of NULP. All Users must follow the policies and guidelines of NULP as applicable from time to time, such as these “Terms of Use”.</p>
                        </li>
                        <li>
                            <p>Your access and use of NULP may possibly be disrupted due to technical or operational difficulties, without prior notice of downtime.</p>
                        </li>
                    </ol>
                </li>
                <li>
                    <p><strong>Registered Users</strong></p>
                    <ol type="I">
                        <li>
                            <p>NULP allows Users to register themselves on NULP by:</p>
                            <ol type="I">
                                <li>
                                    <p>Self-registration</p>
                                </li>
                                <li>
                                    <p>NIUA (Central Program Team) registration</p>
                                </li>
                                <li>
                                    <p>State led registration</p>
                                </li>
                            </ol>
                        </li>
                        <li>
                            <p>Depending on your mode of registration, as a Registered User, NULP collects certain data and information about you in accordance with the Privacy Policy of NULP. Registered Users may also choose to give their consent for certain of their data and information to be accessed by Administrators for specified purposes in accordance with the relevant policies and guidelines of NULP as applicable from time to time.</p>
                        </li>
                        <li>
                            <p>Registered Users can use / participate in a variety of offerings on NULP including:</p>
                            <ol type="I">
                                <li>
                                    <p>Submitting / posting / uploading / otherwise providing Content.</p>
                                </li>
                                <li>
                                    <p>Accessing courses or other collections of Content;</p>
                                </li>
                                <li>
                                    <p>Creating or participating in NULP Groups.</p>
                                </li>
                            </ol>
                        </li>
                        <li>
                            <p>All Registered Users (including Administrators) must follow the policies and guidelines of NULP as applicable from time to time, including but not limited to these Terms, the Content Policy of NULP and Privacy Policy of NULP. Some Registered Users may have read, write, and edit rights on NULP to create, curate, review or publish Content, the rights given by the Institutional Users.</p>
                        </li>
                        <li>
                            <p>Registered Users are responsible for maintaining the confidentiality of their User ID and Password and responsible for all activities that occur under their User ID and Password. As a Registered User, you agree, inter alia, to provide true, accurate, current and complete information about yourself as prompted by the NULP registration form or provided by you as a visitor or user of a third-party site through which you access NULP. If you provide any information that is untrue, inappropriate, inaccurate, not current or incomplete or there are reasonable grounds to suspect that such information is untrue, inaccurate, inappropriate, not current or incomplete, or not in accordance with these Terms, the administrators and technology support providers of NULP have the right to indefinitely suspend or terminate your registration or block access to and participation in NULP.</p>
                        </li>
                        <li>
                            <p>A Registered User may not transfer their registration to anyone else.</p>
                        </li>
                    </ol>
                </li>
            </ol>
        </li>
        <li>
            <p><strong>Prohibited Content and Use</strong></p>
        </li>
    </ol>
    <p>Registered Users shall not:</p>
    <ol>
        <ol type="a">
            <li>
                <p>use NULP for any purpose other than learnings.</p>
            </li>
            <li>
                <p>post, upload, or distribute any defamatory, libellous, or inaccurate Content or other content on NULP.</p>
            </li>
            <li>
                <p>post, upload, or distribute any Content or other content that is unlawful or that a reasonable person could deem to be objectionable, offensive, indecent, pornographic, harassing, threatening, vulgar, hateful, racially, or ethnically offensive, or otherwise inappropriate.</p>
            </li>
            <li>
                <p>contribute any Content (including any of the elements that such Content comprises such as text, scripts, graphics, photos, sounds, music, videos, audio-visual combinations etc.) that infringes upon any third-party rights including but not limited to intellectual property rights such as copyrights or any other legal rights of individual(s)/organisation(s).</p>
            </li>
            <li>
                <p>use NULP in any manner that is harmful to minors, or in any manner that violates the extant&nbsp;<strong>Terms of Use</strong>, the&nbsp;<strong>Privacy Policy,</strong> and the&nbsp;<strong>Content Policy</strong>.</p>
            </li>
            <li>
                <p>impersonate any person or entity, falsely claim an affiliation with any person or entity, or access NULP accounts of others without permission, or perform any other fraudulent activity.</p>
            </li>
            <li>
                <p>delete the copyright or other proprietary rights on NULP or on any licensed Content.</p>
            </li>
            <li>
                <p>assert, or authorize, assist, or encourage any third party to assert, against NULP any intellectual property infringement claims regarding any Content you have used, submitted, or otherwise made available on or through NULP.</p>
            </li>
            <li>
                <p>make unsolicited offers, advertisements, proposals, or send junk mail or spam to other Users (including, but not limited to, unsolicited advertising, promotional materials, offerings or other solicitation material, bulk mailing of commercial advertising, chain mail, informational announcements, charity requests, and petitions for signatures).</p>
            </li>
            <li>
                <p>use NULP for any illegal purpose, or in violation of any local, state, national, or international law, including, without limitation, laws governing intellectual property and other proprietary rights, and data protection and privacy.</p>
            </li>
            <li>
                <p>defame, harass, abuse, threaten or defraud Users, or collect, or attempt to collect, personal information about Users or third parties without their consent.</p>
            </li>
            <li>
                <p>remove, circumvent, disable, damage, or otherwise interfere with security-related features of NULP.</p>
            </li>
            <li>
                <p>modify, adapt, translate or create derivative works based upon Content on NULP or any part thereof, except and only to the extent expressly permitted by the license applicable to such Content; or</p>
            </li>
            <li>
                <p>intentionally interfere with or damage operation of NULP or any user's usage of it, by any means, including without limitation by participation in any denial-of-service type attacks or by uploading or otherwise disseminating viruses, adware, spyware, worms, or other malicious code.</p>
            </li>
        </ol>
        <li>
            <p><strong>Privacy and Personal Information</strong></p>
            <ol type="a">
                <li>
                    <p>NULP takes the privacy of its users very seriously. Please review the entire Privacy Policy of NULP.</p>
                </li>
                <li>
                    <p>By using NULP and/or by providing your information, you consent to the collection and use of the information you disclose on NULP in accordance with the policies and guidelines of NULP as applicable from time to time, including but not limited to the Privacy Policy of NULP.</p>
                </li>
            </ol>
        </li>
        <li>
            <p><strong>Content Policy of NULP</strong></p>
            <ol type="a">
                <li>
                    <p>NULP is an open content repository that has been built with the purpose to enable greater access to learning and teaching content. When you use NULP, you join a vast community of learners and creators using NULP which involves a certain level of trust.</p>
                </li>
                <li>
                    <p>Users are expected to respect that trust and be responsible about their usage of NULP and all its Content and follow all relevant terms, policies and guidelines applicable to Content, including the&nbsp;<strong>Content Policy of NULP</strong>.</p>
                </li>
                <li>
                    <p>By submitting / uploading / creating/ publishing Content on NULP and following the open license frameworks adopted by NULP, Registered Users recognize and accept that the Content will be accessed and used by any individual, institution or organization through various platforms, portals, and applications in accordance with license conditions.</p>
                </li>
                <li>
                    <p>It shall be the sole responsibility of Registered Users to ensure that proper and correct attributions, acknowledgements, and sourcing references are given to the Content and individual(s)/ institution(s) that have been involved in the development and creation of Content and wherever Content has been quoted/used.</p>
                </li>
                <li>
                    <p>It shall be the responsibility of Registered Users not to infringe upon any third-party rights including but not limited to intellectual property rights such as copyrights or any other legal rights of individual(s)/organization(s) with regards to Content (including all the elements that such Content comprises such as text, scripts, graphics, photos, sounds, music, videos, audio-visual combinations etc.) contributed on NULP. For any legal matter arising out of infringement of such rights by the Registered User, such Registered User shall be solely responsible for any financial or other damages arising out of such violations and disputes.</p>
                </li>
            </ol>
        </li>
        <li>
            <p><strong>Changes in NULP Policies</strong></p>
        </li>
    </ol>
    <p>These Terms (including any policies, terms, and guidelines) may be updated or modified from time to time and the revised Terms will be reflected herein. Your continued use of NULP constitutes acceptance of the then-current Terms. Hence, we encourage you to visit this page periodically to review any changes.<strong>&nbsp;</strong></p>
    <p><strong>Limited Liability</strong></p>
    <ol>
        <ol type="a">
            <li>
                <p>As a User you shall not collect any personal information or sensitive personal data of other Users through NULP, but if you do collect such information, you must ensure that such collection, storage, transfer, and disclosure is in accordance with Indian law currently in force, including but not limited to the (Indian) Information Technology (Reasonable Security Practices and Procedures) Rules, 2011.</p>
            </li>
            <li>
                <p>GoI, administrators and technology support providers of NULP and Institutional Users do not guarantee the accuracy of any of the Content made available on the NULP. GoI, administrators and technology support providers of NULP and Institutional Users do not take responsibility for any external websites linked on NULP, including compliance with Indian Government Web Guidelines.</p>
            </li>
            <li>
                <p>Registered Users are solely responsible for maintaining the security and confidentiality of the username and password. Any unauthorized use of your username or password or any other breach of security must be notified by sending an email notification to nulp@niua.org. GoI, administrators and technology support providers of NULP and Institutional Users will not be liable for any loss or damage arising from failure to comply with this provision.</p>
            </li>
            <li>
                <p>Registered Users are responsible for any offensive or unlawful Content posted, transmitted, sent or communicated through NULP. GoI, administrators and technology support providers of NULP and Institutional Users shall not be held responsible for any offensive or unlawful Content posted, uploaded, transmitted, sent and received through NULP.</p>
            </li>
            <li>
                <p>In no event will GoI, NIUA, administrators and technology support providers of NULP be liable for any expense, loss or damage including, without limitation, indirect or consequential loss or damage, or any expense, loss or damage whatsoever arising from use, or loss of use, of data, arising out of or in connection with the access or use of NULP.</p>
            </li>
        </ol>
        <li>
            <p><strong>Termination</strong><strong>&nbsp;-&nbsp;</strong>Any violation or breach of these Terms, including while investigating complaints or alleged violation of these Terms, may lead to suspension or termination of your registration and access to NULP.&nbsp;</p>
        </li>
        <li>
            <p><strong>Electronic Agreement</strong><strong>&nbsp;-</strong> This document is a written agreement, an electronic record and valid and enforceable electronic agreement / contract under Information Technology Act, 2000 (as applicable in Republic of India) and rules there under as applicable and the amended provisions pertaining to electronic records in various statutes under applicable Indian laws. This electronic record is generated by a computer system and does not require any physical or digital signatures. Your usage of NULP shall be your deemed acceptance of these Terms and all the modifications and updates thereto.</p>
        </li>
        <li>
            <p><strong>Governing Law and Dispute Resolution</strong><strong>&nbsp;-</strong> These Terms shall be governed by and construed in accordance with the Indian law. Any dispute arising under these Terms shall be subject to the exclusive jurisdiction of the courts of New Delhi, India.</p>
        </li>
        <li>
            <p><strong>Disclaimer</strong></p>
        </li>
    </ol>
    <p>NULP IS AVAILABLE ON AN "AS IS" BASIS AND THERE ARE NO WARRANTIES OF ANY KIND WITH RESPECT TO NULP. GOI AND THE ADMINISTRATORS AND TECHNOLOGY SUPPORT PROVIDERS OF NULP SPECIFICALLY DISCLAIM ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE OR NON-INFRINGEMENT. ACCESS AND USE OF NULP (INCLUDING ANY CONTENT OR INFORMATION) IS ENTIRELY AT YOUR OWN RISK. IN NO EVENT WILL NIUA OR THE ADMINISTRATORS AND TECHNOLOGY SUPPORT PROVIDERS OF NULP BE LIABLE FOR ANY EXPENSE, LOSS OR DAMAGE INCLUDING, WITHOUT LIMITATION, INDIRECT OR CONSEQUENTIAL LOSS OR DAMAGE, OR ANY EXPENSE, LOSS OR DAMAGE WHATSOEVER ARISING FROM USE, OR LOSS OF USE, OF DATA, ARISING OUT OF OR IN CONNECTION WITH THE USE OF NULP. WHEN YOU SELECT A LINK TO AN OUTSIDE WEBSITE, YOU ARE LEAVING NULP AND ARE SUBJECT TO THE PRIVACY AND SECURITY POLICIES OF THE OWNERS / SPONSORS OF THE OUTSIDE WEBSITE / DOMAIN.</p>
    <h3><strong>Privacy Policy of NULP</strong></h3>
    <p><em>( Last updated on&nbsp;</em><em><strong>19-05-2022</strong></em><em>&nbsp;)</em></p>
    <p>NULP (National Urban Learning Platform) is the Learning Platform for the Urban practitioners across India. NULP is a joint initiative of Ministry of Housing and Urban Affairs, Government of India and the National Institute of Urban Affairs (NIUA). Users of NULP can access content for learning on the web at https://nulp.niua.org/, through the NULP mobile application, and the web application.</p>
    <p>The privacy and protection of data of NULP Users is of utmost importance and shall be ensured at all times. This Privacy Policy shall cover details of data protection and management on NULP, including how personal data of users of NULP is managed, used and processed. Users are individuals who access and use NULP and broadly comprise (i) users who access and use NULP by registering themselves on NULP (&nbsp;<strong>"Users"</strong>), (ii) users who access and use NULP after being registered by the Central Program Team on NULP ("<strong>Registered Users</strong> "), (iii) users who are registered on NULP and are authorized to be administrators on behalf of Institutional Users (such as TERI,WRI, State Urban Departments etc.) ("<strong>Administrators"</strong> ). Institutional Users operate as tenants on NULP. More details on the rights and responsibilities of Users and Registered Users are set out in the&nbsp;<strong>Terms of Use</strong>.</p>
    <p>By accessing and using NULP, and by providing your information on NULP, you consent to the collection and use of the information you disclose on NULP by NULP and relevant Administrators of NULP in accordance with the policies and guidelines of NULP as applicable from time to time, including the Terms of Use and this Privacy Policy. If you do not agree with the contents of this policy, please do not access or use NULP.</p>
    <p>This&nbsp;<strong>Privacy Policy</strong> should be read in conjunction with the&nbsp;<strong>Terms of Use</strong>. Defined terms used but not defined herein shall have the meaning ascribed to them in the&nbsp;<strong>Terms of Use</strong>.</p>
    <ol>
        <li>
            <p><strong>Rights of Users:</strong></p>
            <ol type="a">
                <li>
                    <p>Right to fair, transparent, and lawful collection of your data and information on NULP.</p>
                </li>
                <li>
                    <p>Right to be informed about the ways in which your data and information that is collected on NULP will be used</p>
                </li>
                <li>
                    <p>Right to receive all the information you need to provide informed consent before collection of your personally identifiable information or sensitive personal data or information on NULP and sharing of the same with relevant Administrators</p>
                </li>
                <li>
                    <p>Right to revoke such consent</p>
                </li>
                <li>
                    <p>Right to privacy and confidentiality regarding your personal data and information</p>
                </li>
                <li>
                    <p>Right to proper use of your personal data and information by Administrators for specified and legitimate purposes related to your use of NULP.</p>
                </li>
                <li>
                    <p>Right to keep your personal information accurate and up to date</p>
                </li>
                <li>
                    <p>Right to secure collection, handling and storage of your personal data and information</p>
                </li>
                <li>
                    <p>Right to protection from unauthorized or unlawful use of your personal data and information</p>
                </li>
                <li>
                    <p>Right to view and access NULP privacy policy.</p>
                </li>
            </ol>
        </li>
        <li>
            <p><strong>Responsibilities of Administrators with respect to User data and information</strong></p>
            <ol type="a">
                <li>
                    <p>To respect the privacy and data protection rights of Users.</p>
                </li>
                <li>
                    <p>To ensure the security of and use of data (especially any personal information) shared by Registered Users is limited solely to the uses and purposes mentioned here</p>
                </li>
                <li>
                    <p>To know that any use of data for purposes outside of the proper use shall be considered violation of the terms of the policies of NULP as well as applicable laws and policies of India and they shall be responsible and liable for such actions and for any loss or damage arising from failure to comply with this obligation</p>
                </li>
                <li>
                    <p>To ensure their communication (if any) with Registered Users is explicitly limited and relevant to the purpose of their usage of NULP and meets the Appropriateness standards set out in the Content Policy of NULP</p>
                </li>
                <li>
                    <p>To ensure that their Content and programs on NULP are not used for any of the Prohibited Uses set out in the Terms of Use</p>
                </li>
            </ol>
        </li>
        <li>
            <p><strong>What User data and information is collected on NULP?</strong></p>
            <ol type="a">
                <li>
                    <p>All&nbsp;<strong>Users</strong> can expect the following data and information of theirs to be collected on NULP:</p>
                    <ol type="I">
                        <li>
                            <p><strong>Basic Information</strong>: User Type (eg. learner, creator, others)</p>
                        </li>
                        <li>
                            <p><strong>Geographical Information</strong>: State and District</p>
                        </li>
                        <li>
                            <p><strong>Preferences:&nbsp;</strong>Domain of interest, Language of Courses / training, Medium of Content, Sub domain interest areas</p>
                        </li>
                        <li>
                            <p><strong>NULP Usage:&nbsp;</strong>Usage history, time spent on Content, Content created/ contributed / published and its usage, progress in trackable collections of Content (e.g., courses), scores &amp; assessment results, question-wise answers and other telemetry data in relation to usage of NULP, badges generated, certificates issued.</p>
                        </li>
                        <li>
                            <p><strong>IP Address</strong>: The IP address of a User is collected once for the limited purpose of determining your approximate location - the State, City and District of origin. The IP address is not stored in the database of Registered Users and the precise location of any User cannot be determined. The User can confirm or modify the State and District details determined based on the IP address.</p>
                        </li>
                        <li>
                            <p>NULP uses hash digest functions and fingerprinting to create unique identifiers for different devices. NULP also uses FCM tokens to enable push notifications to your devices, should you choose to opt for the same.</p>
                        </li>
                        <li>
                            <p>NULP also generates a unique identifier for each device used to access NULP.</p>
                        </li>
                    </ol>
                </li>
                <li>
                    <p>In case of&nbsp;<strong>Registered Users</strong>, they can expect the following additional information of theirs to be collected on NULP:</p>
                    <ol type="I">
                        <li>
                            <p>Name</p>
                        </li>
                        <li>
                            <p>Email Address / Mobile number, and</p>
                        </li>
                        <li>
                            <p>NULP Password</p>
                        </li>
                    </ol>
                </li>
                <li>
                    <p><strong>Registered Users&nbsp;</strong>have an option to provide the following information of theirs ("<strong>Declared Information</strong>"), namely:</p>
                    <ol type="I">
                        <li>
                            <p>Both Email Address and Mobile Number,</p>
                        </li>
                        <li>
                            <p>Block,</p>
                        </li>
                        <li>
                            <p>Organisation / ULB name,</p>
                        </li>
                        <li>
                            <p>ID as provided by your state/organisation.</p>
                        </li>
                    </ol>
                </li>
                <li>
                    <p>No other personally identifiable information or sensitive personal data or information of the User is collected.</p>
                </li>
                <li>
                    <p>All&nbsp;<strong>Users&nbsp;</strong>(using the NULP mobile app to access NULP) have a profile which specifies the User type, Geographical Information and Preferences. They may choose to customize their profile by changing these details at any time as well as providing their name. If Users are using NULP as a guest User, i.e. without registering on NULP, your User type and Preferences are stored locally on your device. Only Registered Users can view their profile on both the NULP mobile app as well as the NULP web portal, and their profiles specify all the additional information provided by such a Registered User.</p>
                </li>
                <li>
                    <p><strong>Children as Registered Users</strong>: NULP collects the year of birth of a User in order to determine whether a User is below 18 years. In the event a person under 18 years of age is registering on NULP, NULP prompts the User to provide the email address or mobile number of a parent / guardian for the purposes of registration. Children under 18 years of age are neither required to nor encouraged to provide their personal information.</p>
                </li>
                <li>
                    <p>You represent to us that the data and information you provide on NULP from time to time is and shall be correct, current and updated and you have all the rights, permissions and consents to provide such data and information. Your providing the information or data and the consequent storage, collection, usage, transfer, access or processing of the same in accordance with the&nbsp;<strong>Terms of Use</strong> and this&nbsp;<strong>Privacy Policy</strong> shall not be in violation of any third party agreement, laws, charter documents, judgments, orders and decrees.</p>
                </li>
            </ol>
        </li>
        <li>
            <p><strong>How is User data and information collected?</strong></p>
            <ol type="a">
                <li>
                    <p>Basic Information and Preferences are collected when a User accesses and uses NULP for the first time. These details can be updated by the User from their profile.</p>
                </li>
                <li>
                    <p>Usage data of Users is collected as and when a User accesses, uses and navigates NULP.</p>
                </li>
                <li>
                    <p>While registering for the first time, additional information like Mobile number, Date of Birth etc. are captured</p>
                </li>
                <li>
                    <p>Declared Information of Registered Users is collected with their explicit consent when they choose to provide the same on NULP, through their profile or otherwise.</p>
                </li>
            </ol>
        </li>
        <li>
            <p><strong>Who has access to User data and information?</strong></p>
            <ol type="a">
                <li>
                    <p>NULP Usage data (including Usage across the States and Cities) is a part of anonymised and aggregated data sets that is accessible to relevant Administrators of NULP and to the employees, contractors or subcontractors of the technology service providers of NULP.</p>
                </li>
                <li>
                    <p>If you are a User, your Basic Information, Geographical Information, Preferences, and Usage data is accessible to the employees, contractors or subcontractors of the technology service providers of NULP (under strict confidentiality obligations) if they need to access the data to process it on behalf of NULP or an Administrator or to provide the services available on NULP. For Registered Users, your Name is also accessible in this manner.</p>
                </li>
                <li>
                    <p>Usage data which is anonymised and aggregated by State and Cities is also available publicly on NULP.</p>
                </li>
                <li>
                    <p>NULP runs on the License of Creative Commons Attribution&nbsp;</p>
                </li>
                <li>
                    <p>Your data and information is only accessible outside of the NULP platform when it is necessary to offer the service, comply with law, or with your permission.</p>
                </li>
            </ol>
        </li>
        <li>
            <p><strong>What is User data and information used for?</strong></p>
            <ol type="a">
                <li>
                    <p>NULP processes your data and information when necessary for providing access to Content for learning purposes and running programs on NULP. These purposes are legitimate. The uses of your data are set out below:</p>
                    <ol type="I">
                        <li>
                            <p>To create a profile for you to have a customized experience on NULP</p>
                        </li>
                        <li>
                            <p>To suggest relevant Content for you to conveniently discover Content based on your preferences, activities on NULP, and Content you are viewing on NULP</p>
                        </li>
                        <li>
                            <p>To enable you to access and use Content on NULP;</p>
                        </li>
                        <li>
                            <p>To enable you to participate in programs run by various national &amp; international organisations on NULP</p>
                        </li>
                        <li>
                            <p>To provide you push notifications on your hand-held devices, only if you have provided permission for the same during app installation;</p>
                        </li>
                        <li>
                            <p>To generate badges for or issue certificates to you upon completion of milestones;</p>
                        </li>
                        <li>
                            <p>To maintain records of your progress and certificates/badges in relation to collections of Content you have accessed and used;</p>
                        </li>
                        <li>
                            <p>To measure interest in the offerings on NULP and to improve NULP over time;</p>
                        </li>
                        <li>
                            <p>To track and analyse usage of Content on NULP by Administrators and Content providers to improve NULP and its offerings over time;</p>
                        </li>
                        <li>
                            <p>To assess, evaluate, validate Content submitted / posted / uploaded by Registered Users;</p>
                        </li>
                        <li>
                            <p>To report anonymized usage of NULP and its Content by Administrators to improve NULP over time;</p>
                        </li>
                        <li>
                            <p>To contact you and deliver information, notices, seek feedback or other communications in connection with your usage of NULP. By accepting the&nbsp;<strong>Terms of Use</strong> including the Privacy Policy, you expressly agree to receive this information;</p>
                        </li>
                        <li>
                            <p>To resolve disputes, troubleshoot problems, detect and protect you against fraud and other criminal activity, enforce the Terms of Use and any other agreements;</p>
                        </li>
                        <li>
                            <p>At times multiple users may be looked at to identify problems or resolve disputes, and in particular may examine your information or data to identify users using multiple User IDs or aliases. Your information or data may be compared or reviewed for errors, omissions and for accuracy; and</p>
                        </li>
                        <li>
                            <p>For any other use that may be described to you at the time of collection.</p>
                        </li>
                    </ol>
                </li>
                <li>
                    <p>The administrators and technology support providers of NULP may use third parties as service providers to facilitate or outsource one or more aspects of service operations that are provided on NULP (e.g., search technology, discussion boards, technical service providers, affiliate) and therefore some of your information or data may be provided directly to these service providers. These service providers are subject to confidentiality and other legal restrictions that prohibit their use of the information provided to them for any purpose other than to facilitate specific website related operations.</p>
                </li>
                <li>
                    <p>If we wish to use your data and information for a new purpose, not covered by this Privacy Policy, then we will provide you with a new notice explaining this new use prior to commencing the processing and setting out the relevant purposes and processing conditions. Where and whenever necessary, we will seek your prior consent to the new processing, unless authorized by law.</p>
                </li>
                <li>
                    <p>In any event, your data will not be used for any of the following purposes:</p>
                    <ol type="I">
                        <li>
                            <p>Rent or sale or other commercial purposes;</p>
                        </li>
                        <li>
                            <p>Advertising or marketing;</p>
                        </li>
                        <li>
                            <p>Phone calls or other forms of unsolicited communication that is not related to your usage of NULP;</p>
                        </li>
                        <li>
                            <p>Building a personal profile, other than for learning purposes on NULP;</p>
                        </li>
                        <li>
                            <p>Any of the Prohibited Purposes set out in the&nbsp;<strong>Terms of Use</strong>; and</p>
                        </li>
                        <li>
                            <p>Any purpose that is not disclosed in this policy or on NULP.</p>
                        </li>
                    </ol>
                </li>
                <li>
                    <p>Administrators are responsible for any use of data and information outside the proper use and shall be held accountable for the violation of the terms and policies of NULP, as well as applicable laws and policies of India for any misuse. Administrators shall be liable for such actions and for any loss or damage arising from failure to comply with the obligation of proper use of your data and information. Should you believe that your data or information is being used in a manner inconsistent with this Privacy Policy, please contact the NULP support team with the details of your concern by sending an email to&nbsp;<strong>nulp@niua.org</strong>.</p>
                </li>
            </ol>
        </li>
        <li>
            <p><strong>How is User data and information stored?</strong></p>
            <ol type="a">
                <li>
                    <p>Reasonable and appropriate security practices and procedures are being adopted to secure your personal data and information in accordance with Indian laws currently in force, including the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011. These measures include administrative, physical security, and technical controls in order to safeguard your personal data and information.</p>
                </li>
                <li>
                    <p>Your data, including your Declared Information, any personally identifiable information or sensitive personal data or information is securely stored using Microsoft Azure cloud services which have its servers in India. Your data and information will primarily be stored in electronic form however certain data may also be stored in physical form.</p>
                </li>
                <li>
                    <p>Third party service providers are engaged to store and process your data. These service providers are contractually bound to follow reasonable security standards to safeguard your data.</p>
                </li>
                <li>
                    <p>Your email address and mobile number and any other personally identifiable information is only collected should you choose to provide the same and it is encrypted and stored securely. Personally identifiable information is only shared with Administrators for purposes specified to you, with your explicit consent and under the obligation that the Administrators will use such information only in connection with your usage of NULP.</p>
                </li>
                <li>
                    <p>Your IP address is only collected once for the limited purpose of ascertaining and suggesting your State and District. Your IP address is not stored on NULP at any time.</p>
                </li>
                <li>
                    <p>Additionally, a variety of methods such as network and infrastructure security, encryption and manual security procedures are used to secure your information and data against loss or damage and to help protect the accuracy and security of your personal information / general information / usage data and to prevent unauthorized access or improper use. If you think that NULP or any of your personal information / general information / usage data is not secure or that there has been unauthorized access to the website or your personal data, please contact&nbsp;<strong>nulp@niua.org</strong> immediately.</p>
                </li>
                <li>
                    <p>Although NULP strives to protect your personal information and data, it cannot guarantee the security of your data while it is being transmitted to its site; any transmission is at your own risk. Once your information has been received, reasonable procedures and security features are in place to reasonably endeavour to prevent unauthorized access in accordance with Indian law.</p>
                </li>
            </ol>
        </li>
        <li>
            <p><strong>How long is User data and information stored?</strong></p>
            <ol type="a">
                <li>
                    <p>Your data will not be retained for a period more than necessary to fulfil the purposes outlined in this Privacy Policy, unless a longer retention period is required by law or for directly related legitimate purposes.</p>
                </li>
            </ol>
        </li>
        <li>
            <p><strong>What are the system permissions required by the NULP?</strong></p>
            <ol type="a">
                <li>
                    <p>Microphone - Your system Microphone will be used if voice recording is explicitly requested as part of a Content for the purposes of practice. This voice recording is only stored locally on your system. Your system Microphone will be used if a Registered User creating Content wants to add a voice recording to Content. This voice recording will become part of the Content.</p>
                </li>
                <li>
                    <p>Camera - Your system Camera will only be used if you want to scan QR codes to access Content on NULP.</p>
                </li>
                <li>
                    <p>Access to file manager / files - This is used by the NULP android / iOS applications (as may be applicable) to transfer Content to an external storage space. Additionally, on the NULP desktop app, this is used to transfer Content to and from an external storage device like a pen drive or SD card.</p>
                </li>
            </ol>
        </li>
        <li>
            <p><strong>Cookies: How are they used? What types of cookies are used? How to manage your cookies?</strong></p>
            <ol type="a">
                <li>
                    <p>Out of all the consumption clients, only the NULP web portal uses cookies. NULP only uses session cookies, none of the other types of cookies. NULP session cookies are used to store URLs in order to better redirect users to the right pages. For example, when a User signs-in to NULP from the courses page, they'll need to be redirected back to the courses page at the end of sign-in for a cleaner user experience. Session cookies are also used to store whether to use the Content Delivery Network (CDN) to pull images, plugins and other assets that are shown on the user interface. This is to enable faster loading of the pages the User interacts with. No personal information, or user preferences are stored in cookies.</p>
                </li>
                <li>
                    <p>Users can clear their cookies by going to their browser settings and clearing their browsing data (by specifically checking off the option to clear cookies). Doing so, does not impact their user experience on NULP as usage of NULP sets the cookies again. Users can also choose to block cookies from the settings as well. Doing so, will mean that certain things on NULP will not function properly. For eg., images/plugins may take a long time to load and the user will not be taken to the right pages after login.</p>
                </li>
            </ol>
        </li>
        <li>
            <p><strong>Data and information NULP is not responsible for</strong></p>
            <ol type="a">
                <li>
                    <p>NULP may have Content, webpages, cookies, files, software, data or other information or communication links that are originated, created or posted by third parties that may have the capability to collect, store or use your data or information. The administrators and technology support providers of NULP are not responsible for such data or information collected, stored or used by third parties even if such third parties use NULP to collect, store or use such data or information.</p>
                </li>
                <li>
                    <p>If you access NULP through a third party QR code scanner or through a web browser, the administrators and technology support providers of NULP are not responsible for the data or information collected by such third parties.</p>
                </li>
                <li>
                    <p>NULP is not responsible for the privacy practices of other websites and users need to be aware of the data privacy practices of such sites should they choose to use these links.</p>
                </li>
            </ol>
        </li>
        <li>
            <p><strong>Compliance with laws and law enforcement</strong></p>
            <ol type="a">
                <li>
                    <p>The administrators and technology support providers of NULP cooperate with governments and law enforcement agencies or any third party by any order under law for the time being in force to enforce and comply with the law. Any information about you will be disclosed to the government or law enforcement officials or private parties as, in the sole discretion of the administrators and technology support providers, if they believe necessary or appropriate to respond to claims and legal process, to protect their property and rights or a third party, to protect the safety of the public or any person, or to prevent or stop any illegal, unethical or legally actionable activity.</p>
                </li>
                <li>
                    <p>Your information or data may also be provided to various tax authorities upon any demand or request from them. You acknowledge that NULP can be accessed from anywhere in the world and it will have users from all over the world and therefore governments, judiciaries or law enforcement authorities in various parts of the world may have or assume jurisdiction over NULP and NULP may be subject to the laws, rules, regulations and judgments of various countries, states, municipalities or provinces where it may not have a direct presence to store, process, collect, use or keep your information or data. You acknowledge that government or law enforcement authorities in the countries where your data or information is stored may have the right to decrypt, collect, monitor or access your data or information, which actions are completely out of the control of the administrators and technology support providers of NULP. The administrators and technology support providers of NULP do not take any responsibility for such actions.</p>
                </li>
            </ol>
        </li>
        <li>
            <p><strong>Deleting your information</strong></p>
            <ol type="a">
                <li>
                    <p>If you wish to have the information or data that you have provided deleted, you can always do so by sending an email request to&nbsp;<strong>nulp@niua.org</strong>. You may note that deletion of certain information or data may lead to cancellation of your registration with NULP and your access to certain features of NULP. You also agree and acknowledge that certain data or information cannot be deleted or may be prohibited to be deleted as required under any applicable law, law enforcement requests or under any judicial proceedings.</p>
                </li>
            </ol>
        </li>
        <li>
            <p><strong>Changes to this Privacy Policy</strong></p>
            <ol type="a">
                <li>
                    <p>NULP reserves the right to modify this privacy statement at any time, so please review it frequently. If a material change is made to the practices regarding your personally identifiable information, you will be notified, by means of a notice on NULP.</p>
                </li>
            </ol>
        </li>
        <li>
            <p><strong>How to contact us?</strong></p>
            <ol type="a">
                <li>
                    <p>If you have any queries, comments, or requests, please contact us by sending an email to&nbsp;<strong>nulp@niua.org</strong>.</p>
                </li>
            </ol>
        </li>
    </ol>
    <p>Read Terms of UseRead Content Policy of NULP</p>
    <h3><strong>Content Policy of NULP</strong></h3>
    <p><em>(Last updated on&nbsp;</em><em><strong>19-05-2022</strong></em><em>&nbsp;)</em></p>
    <p>This Content Policy sets out the guidelines for content to be followed on NULP. The NULP Strategy and Approach Paper clearly articulates one of the intentions of NULP - to create a common repository of open content resources for easy access to urban stakeholders across the country. This Content Policy sets out the principles and process to achieve this end.</p>
    <p>The content creation and curation process on NULP is envisaged to be an open process with low barriers to entry. It celebrates and encourages participation by making it simple to create and share content on the platform. It avoids creating barriers to entry in the form of centralized review workflows and federates that process to the community to police itself. Institutional Users, through their Administrators, being the custodians of NULP, frame the guidelines and curation rules, and delegate the authority to curate to the community. This creates a platform that is open, has low barrier to entry, while the quality of content is ensured by the federated process.</p>
    <p>Set out below are some common-sense rules that all Users must comply with respect to Content on NULP. These rules are to be taken seriously as Administrators are required to enforce the same strictly. Users are requested not to look for loopholes or ways around these guidelines and respect the spirit in which they have been created.</p>
    <p>Please read this Content Policy carefully, to learn more about the rules on appropriateness, accuracy, intellectual property rights and licensing that govern Content on NULP.</p>
    <p>This Content Policy should be read in conjunction and together with the&nbsp;<strong>Terms of Use</strong>. Defined terms used but not defined herein shall have the meaning ascribed to them in the&nbsp;<strong>Terms of Use</strong>.</p>
    <h4><strong>Principles for Content on NULP</strong></h4>
    <ol type="a">
        <li>
            <p>Content on the NULP will be contributed by various content contributors across the country. The intent is to enable access to a wide range and diverse content from across the country so as to enable better contextualization of content and wide access for end users.</p>
        </li>
        <li>
            <p>All content published on NULP belongs to the creators of content be it individuals or organizations that have made content available on the platform, they are responsible for use by open learning platforms and applications therefore, content creators are responsible for ensuring accuracy and appropriateness of content.</p>
        </li>
        <li>
            <p>Users can make multilingual and diverse content on NULP.</p>
        </li>
        <li>
            <p>Content on NULP means and includes, (i) content that is written, uploaded, submitted, stored, sent, received, or shared using NULP, learning content on urban domains, best practices, challenges faced by ULB’s other such learning materials meant for wide user consumption, and (iii) other types of Content described in the&nbsp;<strong>Terms of Use</strong>.</p>
        </li>
        <li>
            <p>Registered Users are solely responsible for the accuracy, appropriateness, and violations of any privacy rights, third party rights including intellectual property rights with regards to their Content.</p>
        </li>
        <li>
            <p>Different types of Content are submitted/ posted/ uploaded / published on NULP following different processes and workflows based on the purpose of the Content. Certain Content, such as posts, comments, feedback, submissions, responses, explanations in forums/groups or using project/ survey/ observation tools etc., are directly submitted/ posted/ uploaded. Certain Content contributed by Registered Users that is meant for wider user consumption is published by Institutional Users after following a review process described below.</p>
        </li>
    </ol>
    <h4><strong>Content Contribution</strong></h4>
    <p>Content that is published on NULP for wider user consumption can only be created by Registered Users who are authorized by an Institutional User to have read, write and edit rights to create Content. This authorization may happen at central level or state level. Each Institutional User has their own guidelines for such authorization. Registered Users who create Content are responsible for creating and contributing Content that complies with this&nbsp;<strong>Content Policy</strong>, the&nbsp;<strong>Terms of Use</strong> and&nbsp;<strong>Privacy Policy</strong>, and any other policies and guidelines prescribed from time to time. Registered Users shall have exercised reasonable diligence to satisfy themselves that their Content is ready for public consumption prior to being submitted for review and use on NULP.</p>
    <h4><strong>Content Review &amp; Publishing</strong></h4>
    <p>All Content published on NULP for wider user consumption is curated, reviewed and published by Registered Users who are authorized by an Institutional to have read, write and edit rights to curate, review or publish Content. This authorization may happen at central level or state level. Each Institutional User has their own guidelines for such authorization. Registered Users who curate, review or publish Content shall ensure that the Content they accept complies with this Content Policy, the&nbsp;<strong>Terms of Use</strong> and&nbsp;<strong>Privacy Policy</strong>, and any other policies and guidelines prescribed from time to time.</p>
    <h4><strong>Accuracy and Appropriateness</strong></h4>
    <p>- Registered Users must ensure that all the Content they have created, contributed, reviewed or published is appropriate and accurate and meets their pedagogical and usability requirements as prescribed by Institutional Users. Content identified as inappropriate or inaccurate, as per this Content Policy, will not be published and can be unilaterally removed from NULP.</p>
    <ol type="a">
        <li>
            <p><strong>Accurate Content</strong> - All Content must:</p>
            <ol type="a">
                <li>
                    <p>Be factually correct,</p>
                </li>
                <li>
                    <p>Use language in text, audio, video and interactive materials that is simple and easy to understand, and</p>
                </li>
                <li>
                    <p>Be contextual and relevant to the needs of the intended User.</p>
                </li>
            </ol>
        </li>
        <li>
            <p><strong>Inappropriate Content</strong> includes, but is not limited to:</p>
            <ol type="a">
                <li>
                    <p>Hate Speech - by words either written or spoken or by signs or by visible representation or otherwise promotes or attempts to promote feelings of enmity, hatred or ill-will against persons of a:</p>
                    <ol type="a">
                        <li>
                            <p>Caste</p>
                        </li>
                        <li>
                            <p>Class</p>
                        </li>
                        <li>
                            <p>Race</p>
                        </li>
                        <li>
                            <p>Ethnicity</p>
                        </li>
                        <li>
                            <p>Sex, gender, or gender identity</p>
                        </li>
                        <li>
                            <p>National origin</p>
                        </li>
                        <li>
                            <p>Religious affiliation</p>
                        </li>
                        <li>
                            <p>Sexual orientation, or</p>
                        </li>
                        <li>
                            <p>Disabilities or diseases</p>
                        </li>
                    </ol>
                </li>
                <li>
                    <p>Sexually explicit content</p>
                    <ol type="a">
                        <li>
                            <p>Pornography</p>
                        </li>
                        <li>
                            <p>Explicit text/images/illustrations/sounds of sexual content</p>
                        </li>
                        <li>
                            <p>Descriptions of sexual acts</p>
                        </li>
                    </ol>
                </li>
                <li>
                    <p>Depiction of sexual violence and exploitation</p>
                    <ol type="a">
                        <li>
                            <p>Includes sexual exploitation of minors, and sexual assault.</p>
                        </li>
                        <li>
                            <p>Photographs/ Illustrations/videos depicting incidents of sexual violence</p>
                        </li>
                    </ol>
                </li>
                <li>
                    <p>Depiction of nudity</p>
                    <ol type="a">
                        <li>
                            <p>Nudity would mean displaying genitals, breasts or buttocks (clothed or unclothed) for the purpose of sexual gratification.</p>
                        </li>
                        <li>
                            <p>Other than the depiction of body parts which isn’t gratuitously graphic and is learning, documentary, scientific, or artistic - paintings, sculptures, and other art that depicts nude figures, which is posted for learning purposes. Providing context will help users determine the purpose of the content/asset.</p>
                        </li>
                    </ol>
                </li>
                <li>
                    <p>Content that promotes violence, including</p>
                    <ol type="a">
                        <li>
                            <p>Promoting, encouraging, supporting, praising, or condoning violent actions, activities and behaviour - verbal, physical or emotional.</p>
                        </li>
                        <li>
                            <p>Threatening or inciting others to commit acts of violence</p>
                        </li>
                        <li>
                            <p>Expressing support or praise for groups, people that are involved in violent or criminal behavior</p>
                        </li>
                    </ol>
                </li>
                <li>
                    <p>Content that promotes/depicts/reflects discrimination and bullying or encouraging such behavior, including:</p>
                    <ol type="a">
                        <li>
                            <p>Targeting individuals with the intention of degrading or shaming them.</p>
                        </li>
                        <li>
                            <p>Illustrations or Images altered to degrade individuals</p>
                        </li>
                        <li>
                            <p>Photos or videos of physical or verbal bullying</p>
                        </li>
                        <li>
                            <p>Sharing personal information or harassing people</p>
                        </li>
                        <li>
                            <p>Repeatedly targeting other people with unwanted requests or messages.</p>
                        </li>
                    </ol>
                </li>
                <li>
                    <p>Comprises harmful or dangerous content</p>
                    <ol type="a">
                        <li>
                            <p>which intends to incite violence or encourage dangerous or illegal activities that have an inherent risk of serious physical harm or death.</p>
                        </li>
                        <li>
                            <p>Encourages dangerous or illegal activities for instance - money laundering, gambling, performing stunts, high risk activities, choking games, drug use, or other acts where serious injury or harm may result. Content that depicts dangerous acts may be allowed if the primary purpose is learning, documentary, scientific, or artistic (EDSA), and isn’t gratuitously graphic.</p>
                        </li>
                    </ol>
                </li>
                <li>
                    <p>Other possibilities:</p>
                    <ol type="a">
                        <li>
                            <p>Content which violates the law for the time being in force,</p>
                        </li>
                        <li>
                            <p>Content which infringes any trademark, copyright, or other intellectual property rights,</p>
                        </li>
                        <li>
                            <p>Content which deceives or misleads the User about the origin of such Content and conveys information which is grossly offensive or menacing,</p>
                        </li>
                        <li>
                            <p>Content which contains software viruses or any other computer code, files or programs designed to interrupt, destroy or limit the functionality of any computer resource,</p>
                        </li>
                        <li>
                            <p>Content which threatens the unity, integrity, defence, security or sovereignty of India, friendly relations with foreign states, or public order, or causes incitement to the commission of any cognizable offence or prevents investigation of any offence or is insulting any other nation,</p>
                        </li>
                        <li>
                            <p>Content involvings minors/ children in violence as victims or perpetrators or as forced witnesses to violence, or showing children as being subjected to any form of child abuse,</p>
                        </li>
                        <li>
                            <p>Content involving abuse or ridicule of people with disabilities (physical or mental),</p>
                        </li>
                        <li>
                            <p>Content involving cruelty to, or abuse of animals,</p>
                        </li>
                        <li>
                            <p>depiction of violence, cruelty and horror, scenes of violence primarily,</p>
                        </li>
                        <li>
                            <p>Content involving images/text/ illustrations have the effect of encouraging, justifying, glorifying, glamorising alcohol drinking, drugs and substance abuse; consumption of tobacco or smoking,</p>
                        </li>
                        <li>
                            <p>Content involving degrading or denigrating women in any manner,</p>
                        </li>
                        <li>
                            <p>Content involving vulgarity, obscenity or depravity,</p>
                        </li>
                        <li>
                            <p>Content involving dual meaning words as obviously cater to baser instincts,</p>
                        </li>
                        <li>
                            <p>Content involving visuals or words contemptuous of racial, religious or other groups,</p>
                        </li>
                        <li>
                            <p>Content involving visuals or words which promote superstition, communal, obscurantist, anti-scientific attitude, and</p>
                        </li>
                        <li>
                            <p>Content involving visuals or words involving defamation of an individual or a body of individuals.</p>
                        </li>
                    </ol>
                </li>
            </ol>
        </li>
    </ol>
    <h4><strong>Intellectual Property Rights</strong></h4>
    <ol type="a">
        <li>
            <p>Registered Users are solely responsible for Content they have created, uploaded, sourced, linked, streamed, curated, reviewed, or published on NULP.</p>
        </li>
        <li>
            <p>Registered Users must ensure that Content (meant for wider user consumption) that they create, upload, source, link, stream, curate, review or publish on NULP accurately reflects:</p>
            <ol type="a">
                <li>
                    <p>Author</p>
                </li>
                <li>
                    <p>Copyright holder</p>
                </li>
                <li>
                    <p>Year of copyright</p>
                </li>
                <li>
                    <p>Attributions to creators whose content has been relied on, used in, or referred to in the Content (if any) and sources and citations.</p>
                </li>
                <li>
                    <p>The relevant license, as per the Licensing Policy</p>
                </li>
            </ol>
        </li>
        <li>
            <p>Registered Users who have copyright in the Content they have contributed, consent to publication of their Content in accordance with the&nbsp;<strong>Terms of Use</strong> and this&nbsp;<strong>Content Policy</strong>.</p>
        </li>
        <li>
            <p>In relation to Content being contributed by any person other than the copyright holder of the Content, Registered Users must ensure that they have the necessary authorization, consent, license, or permission to publish such Content in accordance with the&nbsp;<strong>Terms of Use</strong> and this&nbsp;<strong>Content Policy</strong>.</p>
        </li>
        <li>
            <p>If Content includes copyrighted materials (including text, images, photos, illustrations, sounds, music, videos, audio-visual combinations, etc.), Registered Users (creators, curators, reviewers and publishers) must ensure compliance with the license terms, proper attribution and any other third party intellectual property rights. Infringement of copyright or any other intellectual property rights is not acceptable, the proper attributions and acknowledgement of authors and creators for open learning community and creative commons community must be respected and upheld at all times. Administrators and technology support providers of NULP will remove any Content if properly notified that such Content infringes on another\'s intellectual property rights or violates this Content Policy,&nbsp;<strong>Terms of Use</strong> and / or the&nbsp;<strong>Privacy Policy</strong>.</p>
        </li>
        <li>
            <p>By submitting / uploading / creating/ publishing Content on NULP and following the open license frameworks adopted by NULP, Registered Users recognize and accept that the Content (including all the elements that such Content comprises such as text, scripts, graphics, photos, sounds, music, videos, audio-visual combinations etc.) is placed in public domain will be accessed and used by any individual, institution or organization through various platforms, portals and applications in accordance with the license conditions.</p>
        </li>
        <li>
            <p>It shall be the sole responsibility of Registered Users to ensure that proper and correct attributions, acknowledgements and sourcing references are given to the Content and individual(s)/ institution(s) that have been involved in the development and creation of Content and wherever Content has been quoted/used.</p>
        </li>
        <li>
            <p>It shall be the responsibility of Registered Users not to infringe upon any third party rights including but not limited to intellectual property rights such as copyrights or any other legal rights of individual(s)/organization(s) with regards to Content contributed on NULP. For any legal matter arising out of infringement of such rights by the Registered User, such Registered User shall be solely responsible for any financial or other damages arising out of such violations and disputes.</p>
        </li>
        <li>
            <p>GoI and/or the administrators and technology support providers of NULP are not responsible for the violations of any third party rights including intellectual property rights by any User.</p>
        </li>
        <li>
            <p>Any violations of intellectual property rights will be the responsibility of the concerned Users. Any disputes will be settled by the respective parties.</p>
        </li>
        <li>
            <p>GoI and/or the administrators and technology support providers of NULP do not endorse any Content published on NULP, or any opinion, recommendation, or advice expressed therein, and NULP expressly disclaims any and all liability in connection with Content.</p>
        </li>
    </ol>
    <h4><strong>Open Licensing Policy - Creative Commons Framework</strong></h4>
    <ol type="a">
        <li>
            <p>NULP follows principles of open access, open licensing and is a platform for open learning resources. Registered Users must ensure that they follow these licensing terms. Content which does not follow these licensing terms shall be rejected.</p>
        </li>
        <li>
            <p>Content must be made available under the Creative Commons License Framework. Creative Commons licenses provide an easy way to manage the copyright terms that attach automatically to all creative material under copyright. Creative Commons licenses allow that material to be shared and reused under terms that are flexible and legally sound. Creative Commons offers a core suite of six copyright licenses. Anyone can use Creative Commons licensed materials as long as the license conditions are followed. One condition of all Creative Commons licenses is attribution. NULP permits the use of the license <a href="https://creativecommons.org/licenses/by/4.0/legalcode">CC BY4.0</a> (Attribution)</p>
        </li>
        <li>
            <p>Registered Users must ensure that the Content submitted to be published on the NULP for wider user consumption specifies:</p>
            <ol type="a">
                <li>
                    <p>the relevant license under which such Content will be available to the Users.</p>
                </li>
                <li>
                    <p>That the appropriate license terms and well as attributions relating to such Content are properly followed, including details of the creator and source/ citations.</p>
                </li>
                <li>
                    <p>That license options mentioned herein are followed in all cases, and that the relevant license should be compatible with the copyright license applicable to the original piece of content.</p>
                </li>
            </ol>
        </li>
        <li>
            <p>Registered Users acknowledge and accept that since the Content provided herein follows open licensing norms such as creative commons licenses or other open licenses, the use of the Content shall not be limited to specific Institutional Users/ Registered Users that have published the Content and they shall be made available for discovery, access and use by any organization, institution, platform, application and individual in general.</p>
        </li>
        <li>
            <p>Registered Users recognise and accept that once Content is submitted and placed in the public domain for use, they cannot unilaterally withdraw the Content or change the licensing terms.</p>
        </li>
    </ol>
    <h4><strong>Bad Practices:</strong></h4>
    <p>Registered Users must not indulge in any of the following bad practices in relation to their Content, including:</p>
    <ol type="a">
        <li>
            <p><em>Uploading Content (including photos or videos) of individuals without their consent</em>: Photos or videos which include other people who are not the subject of the photo and have not signed a consent / release form to share those photos or videos, are not permitted. Any person that appears in the photo or video (whose face is visible) must have signed a consent / release form where they consent to the sharing of such photo(s) with third parties.</p>
        </li>
        <li>
            <p><em>Uploading Content (including photos or videos) with ethical issues:&nbsp;</em>Photographs or videos containing violent, pornographic, sensitive content or other inappropriate. Content described in this Content Policy that could, in some way, offend our Users are not permitted.</p>
        </li>
        <li>
            <p><em>Uploading Content (including photos, videos or documents) which require authorisation from the author / owner:&nbsp;</em>Certain types of Content (including photographs, videos or documents) require the permission of the author / owner such as copyrighted works (eg. logos, literary or artworks), or confidential documents. It is important that before uploading such Content, appropriate written permissions are taken.</p>
        </li>
        <li>
            <p><em>Uploading Content which doesn’t meet specified technical or visual requirements.</em></p>
        </li>
        <li>
            <p><em>Uploading repeats of the same Content.</em></p>
        </li>
        <li>
            <p><em>Uploading files that contain viruses or malware.</em></p>
        </li>
    </ol>
    <h4><strong>Takedown Policy -</strong></h4>
    <ol type="a">
        <li>
            <p>If a User believes that certain Content published on NULP is in violation of this Content Policy or any applicable laws please contact us at&nbsp;<strong>nulp@niua.org</strong> and necessary action will be taken to review and / or remove such content as quickly as possible.</p>
        </li>
        <li>
            <p>Administrators and technology support providers of NULP reserve the right to remove Content from NULP without any prior notice for any violation of the Content Policy,&nbsp;<strong>Privacy Policy</strong>, or the&nbsp;<strong>Terms of Use</strong>. They may at their sole and absolute discretion delete, remove, disable access or otherwise deal with information, data or Content to comply with laws currently in force, including the Information Technology Act, 2000.</p>
        </li>
    </ol>
    <p><em>DISCLAIMER: Though all efforts have been made to ensure the accuracy and currency of the Content on NULP, the same should not be construed as a statement of law or used for any legal purposes. In no event will the Government of India, MoHUA or NIUA be liable for any expense, loss or damage including, without limitation, indirect or consequential loss or damage, or any expense, loss or damage whatsoever arising from use, or loss of use, of data, arising out of or in connection with the use of NULP. Links to other websites that have been included on this platform are provided for public convenience only.</em></p>
    <h3><strong>NULP Course Terms</strong></h3>
    <p><em>(Last updated on&nbsp;</em><em><strong>19-05-202</strong></em><em><strong>2</strong></em><em>)</em></p>
    <p>These Course Terms specify the rights and responsibilities of Registered Users who choose to join a course on NULP and Administrators of courses on NULP. Administrators of a course are Registered Users authorized by Institutional Users to offer courses on NULP.</p>
    <h4><strong>For Registered Users</strong></h4>
    <ol>
        <li>
            <p><strong>A Registered User that chooses to join a course on NULP can:</strong></p>
            <ol type="a">
                <li>
                    <p>Access the course and its Content</p>
                </li>
                <li>
                    <p>View their own progress</p>
                </li>
                <li>
                    <p>Access and download any certificates received on achieving milestones in the course</p>
                </li>
                <li>
                    <p>Opt out of the course at any time</p>
                </li>
                <li>
                    <p>Provide consent for sharing personal information with Administrators of a course</p>
                </li>
                <li>
                    <p>Revoke consent for sharing personal information with Administrators of a course</p>
                </li>
            </ol>
        </li>
        <li>
            <p><strong>Access and Revocation of access to data and information of Registered User:</strong></p>
            <ol type="a">
                <li>
                    <p>By choosing to join a course, the Registered User agrees to give the Administrators of the course access to their Name, State, District, progress in the course and milestones achieved for the purposes of analysing usage of Content to improve content and other offerings.</p>
                </li>
                <li>
                    <p>Upon joining a course, a Registered User has the option to provide their explicit consent to give the Administrators of the course access to the following additional information, namely: (i) Organisation name (ii) mobile number and (iii) email address. This consent can be given either when prompted by a pop-up or by changing their data sharing settings. This additional information can only be used by the Administrators of the course for the purpose of:</p>
                    <ol type="a">
                        <li>
                            <p>tracking progress of the Registered Users;</p>
                        </li>
                        <li>
                            <p>analysing usage to improve the course, Content and other offerings.</p>
                        </li>
                        <li>
                            <p>validating contact details;</p>
                        </li>
                        <li>
                            <p>issuing certificates; and</p>
                        </li>
                        <li>
                            <p>contacting Registered Users to send relevant information or seek feedback.</p>
                        </li>
                    </ol>
                </li>
                <li>
                    <p>Registered Users can revoke their consent to sharing additional information at any time by changing their data sharing settings.</p>
                </li>
            </ol>
        </li>
        <li>
            <p><strong>Responsibilities of Registered Users:</strong></p>
            <ol type="a">
                <li>
                    <p>To ensure that any of their communication is relevant to the purpose of the course and meet the Appropriateness standards set out in the&nbsp;<strong>Content Policy of NULP</strong>.</p>
                </li>
                <li>
                    <p>To ensure that their use of courses does not violate any of the Prohibited Uses set out in the&nbsp;<strong>Terms of Use</strong>.</p>
                </li>
            </ol>
        </li>
        <li>
            <p><strong>For Administrators of the course on NULP, can:</strong></p>
            <ol type="a">
                <li>
                    <p>Create, review or publish courses on NULP</p>
                </li>
                <li>
                    <p>Access data and information of courses created by or assigned to them, which contain:</p>
                    <ol type="a">
                        <li>
                            <p>Name, State, City and progress data of the Registered Users who have chosen to join the course,</p>
                        </li>
                        <li>
                            <p>Course usage data such as progress and completion details and other related matters</p>
                        </li>
                    </ol>
                </li>
                <li>
                    <p>Use the data and information of the Registered Users only for the purposes of:</p>
                    <ol type="a">
                        <li>
                            <p>tracking their progress;</p>
                        </li>
                        <li>
                            <p>analysing usage of Content to improve content and other offerings;</p>
                        </li>
                        <li>
                            <p>validating contact details;</p>
                        </li>
                        <li>
                            <p>issuing certificates; and</p>
                        </li>
                        <li>
                            <p>contacting Registered Users to send relevant information or seek feedback.</p>
                        </li>
                    </ol>
                </li>
                <li>
                    <p>Create and issue certificates for Registered Users who have achieved milestones in the course.</p>
                </li>
            </ol>
        </li>
        <li>
            <p><strong>Responsibilities of Administrators of a course:</strong></p>
            <ol type="a">
                <li>
                    <p>To ensure that the courses created, reviewed or published by them are in line with the&nbsp;<strong>Content Policy of NULP</strong>, and accordingly meet the Accuracy and Appropriateness standards.</p>
                </li>
                <li>
                    <p>To respect the privacy and data protection rights of Registered Users.</p>
                </li>
                <li>
                    <p>To ensure the security of and use of data (especially personal data) shared by Registered Users is limited solely to the purposes mentioned here.</p>
                </li>
                <li>
                    <p>To know that any use of data for purposes outside of the proper use shall be considered violation of the terms of the policies of NULP as well as applicable laws and policies of India and they shall be responsible and liable for such actions and for any loss or damage arising from failure to comply with this obligation.</p>
                </li>
                <li>
                    <p>To ensure that their communication (if any) with Registered Users is explicitly limited and relevant to the purpose of the course and meets the Appropriateness standards set out in the&nbsp;<strong>Content Policy of NULP</strong>. The email address and phone number of Registered Users shall only be used to share information in connection with the course and shall not under any circumstance be used for any other matters.</p>
                </li>
                <li>
                    <p>To ensure that their courses are not used for any of the Prohibited Uses set out in the&nbsp;<strong>Terms of Use of NULP</strong>.</p>
                </li>
            </ol>
        </li>
    </ol>
    <p><em>These Course Guidelines should be read in conjunction with the policies and guidelines of NULP, including the&nbsp;</em><em><strong>Terms of Use</strong></em><em>,&nbsp;</em><em><strong>Content Policy</strong></em><em>&nbsp;and&nbsp;</em><em><strong>Privacy Policy</strong></em><em>. Defined terms used but not defined herein shall have the meaning ascribed to them in the&nbsp;</em><em><strong>Terms of Use</strong></em><em>.</em></p>
    <p> </p>
    </Container>
    <Footer/>
    </div>

)
};

export default Terms;