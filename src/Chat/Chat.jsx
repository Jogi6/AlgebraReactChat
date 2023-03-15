/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Messages from "../Messages/Messages";
import MessageInput from '../MessageInput/MessageInput';

// Prima 'messages', 'currentMember', 'onSendMessage', 'members' propove
const Chat = ({ messages, currentMember, onSendMessage, members }) => {
    // Vrača JSX
    return <>
        <div className="container min-vh-100">
            <div className='chat-box'>
            <div className="row min-vh-100">
                <div className='col-md-3 d-none d-md-block'>
                    <div id="plist" className="people-list">
                        <ul className="list-unstyled chat-list mt-2 mb-0">
                            {/* prikazuje listu korisnika 'Members'*/}
                            {members.length === 0 ? (
                                <div>No members found</div>
                            ) : (members.map(people => (
                                <li className="clearfix" key={people.id}>
                                    {/* kreiranje slike avatara pomocu DiceBear API */}
                                    <img src={`https://api.dicebear.com/5.x/avataaars/svg?seed=${people.clientData.username}`} alt={`${people.clientData.username} avatar`} />
                                    <div className="about">
                                        <div className="name">{people.clientData.username}</div>
                                        {/* <div className="status"> <i className="fa fa-circle online"></i> {people.clientData.isOnline === 'online' ? 'Online' : 'Offline'} </div> */}
                                    </div>
                                </li>
                            ))
                            )}
                        </ul>
                    </div>
                </div>
                <div className='col-12 col-md-9 chat'>
                    <div className='row'>
                        <div className="chat-header">
                            <div className="row">
                                <div className="col-lg-6">
                                    {/* prikazuvanje trenutnog korisnika 'currentMember'*/}
                                    <a href="#" data-toggle="modal" data-target="#view_info">
                                        <img src={`https://api.dicebear.com/5.x/avataaars/svg?seed=${currentMember.username}`} alt={`${currentMember.username} avatar`} />
                                    </a>
                                    <div className="chat-about">
                                        <h6 className="m-b-0">{currentMember.username}</h6>
                                        {/* <small>Last seen: 2 hours ago</small> */}
                                    </div>
                                </div>
                                <div class="col-lg-6 hidden-sm text-right">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row d-block d-md-none'>
                        <div className='people-list-mobile'>
                            {members.length === 0 ? (
                                    <div>No members found</div>
                                ) : (members.map(people => (
                                    <div className='chat-people-mobile' style={{ backgroundColor: people.clientData.color }}>
                                        <span>{people.clientData.username}</span>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                    {/* prikazuje poruke iz komponente 'Messages' */}
                    <div className='row min-vh-100 vh-100 chat-history overflow-auto'>
                        <Messages messages={messages} member={currentMember} />
                    </div>
                </div>
                
            </div>
            <div className='row'>
                <div className='col-md-3 d-none d-md-block'>
                </div>
                <div className='col-12 col-md-9 chat'>
                    {/* Poslje za slanje poruka se renderira pomocu MessageInput komponente, kojoj se šalje 'onSendMessage' prop 
                        koji je callback funkcija koja se poziva kada korisnik upiše poruku */}
                    <div className='chat-message'>
                        <MessageInput onSendMessage={onSendMessage} />
                    </div>
                </div>
            </div>
            </div>
        </div>
    </>
}

export default Chat;